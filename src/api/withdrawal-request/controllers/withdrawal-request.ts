import { factories } from '@strapi/strapi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default factories.createCoreController('api::withdrawal-request.withdrawal-request' as any, ({ strapi }) => ({
  async submit(ctx) {
    const { data } = (ctx.request.body ?? {}) as {
      data?: {
        name?: string;
        orderNumber?: string;
        email?: string;
        bankAccount?: string;
        returnedItems?: string;
        unopenedConfirmed?: boolean;
        orderDocumentId?: string;
      };
    };

    if (!data?.name || !data?.orderNumber || !data?.email || !data?.bankAccount) {
      return ctx.badRequest('Missing required fields');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry = (await strapi.documents('api::withdrawal-request.withdrawal-request' as any).create({
      data: {
        name: data.name,
        orderNumber: data.orderNumber,
        email: data.email,
        bankAccount: data.bankAccount,
        returnedItems: data.returnedItems ?? null,
        unopenedConfirmed: !!data.unopenedConfirmed,
        requestStatus: 'new',
        ...(data.orderDocumentId ? { order: { connect: [data.orderDocumentId] } } : {}),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    })) as { id: number; documentId: string };

    ctx.body = { data: { id: entry.id, documentId: entry.documentId } };
  },
}));
