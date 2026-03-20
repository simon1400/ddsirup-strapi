import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async assignInvoiceNumber(ctx) {
    const { documentId } = ctx.request.body as { documentId: string };

    if (!documentId) {
      return ctx.badRequest('documentId is required');
    }

    // Check if order exists and already has an invoice number
    const order = await strapi.documents('api::order.order').findOne({
      documentId,
    }) as Record<string, unknown> | null;

    if (!order) {
      return ctx.notFound('Order not found');
    }

    if (order.invoiceNumber) {
      return ctx.send({ invoiceNumber: order.invoiceNumber });
    }

    // Get global info for invoice numbering config
    const globalInfo = await strapi.documents('api::global-info.global-info').findFirst(
      {}
    ) as Record<string, unknown> | null;

    if (!globalInfo) {
      return ctx.internalServerError('Global info not found');
    }

    const currentYear = new Date().getFullYear();
    const storedYear = (globalInfo.invoiceYear as number) ?? currentYear;
    let nextNum = (globalInfo.invoiceNextNumber as number) ?? 1;

    // Reset sequence on new year
    if (storedYear !== currentYear) {
      nextNum = 1;
    }

    const prefix = (globalInfo.invoicePrefix as string) ?? '';

    // Retry loop to handle unique constraint conflicts (race condition)
    const MAX_RETRIES = 5;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const paddedNum = String(nextNum).padStart(5, '0');
      const invoiceNumber = prefix
        ? `${prefix}${paddedNum}`
        : `${currentYear}${paddedNum}`;

      try {
        // Save invoice number to order
        await strapi.documents('api::order.order').update({
          documentId,
          data: {
            invoiceNumber,
          } as any,
        });

        // Increment counter in global info (only after successful order update)
        await strapi.documents('api::global-info.global-info').update({
          documentId: globalInfo.documentId as string,
          data: {
            invoiceNextNumber: nextNum + 1,
            invoiceYear: currentYear,
          } as any,
        });

        return ctx.send({ invoiceNumber });
      } catch (err: any) {
        const isUniqueError =
          err?.message?.includes('unique') ||
          err?.details?.errors?.some((e: any) => e.message?.includes('unique'));

        if (isUniqueError && attempt < MAX_RETRIES - 1) {
          // Invoice number already taken, try next number
          nextNum++;
          continue;
        }
        throw err;
      }
    }

    return ctx.internalServerError('Failed to assign invoice number after retries');
  },
}));
