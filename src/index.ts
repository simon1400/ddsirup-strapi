import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['api::order.order'],

      async afterUpdate(event) {
        const { result } = event;

        // Only trigger when status changes to 'paid'
        if (result.orderStatus !== 'paid') return;

        // If invoiceNumber is already set, the email was already sent
        // (either by webhook or a previous lifecycle trigger)
        if (result.invoiceNumber) return;

        const nextJsUrl =
          process.env.NEXTJS_INTERNAL_URL ?? 'http://localhost:3000';
        const webhookSecret = process.env.INTERNAL_WEBHOOK_SECRET ?? '';

        try {
          const res = await fetch(
            `${nextJsUrl}/api/orders/send-confirmation`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-internal-secret': webhookSecret,
              },
              body: JSON.stringify({ documentId: result.documentId }),
            }
          );

          if (!res.ok) {
            const text = await res.text().catch(() => '');
            strapi.log.error(
              `[order lifecycle] send-confirmation failed: ${res.status} ${text}`
            );
          } else {
            strapi.log.info(
              `[order lifecycle] Confirmation email triggered for order ${result.orderNumber}`
            );
          }
        } catch (err) {
          strapi.log.error(
            `[order lifecycle] Failed to call Next.js send-confirmation: ${err}`
          );
        }
      },
    });
  },
};
