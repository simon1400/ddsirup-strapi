import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {
    // Email sending is handled by the Comgate webhook in Next.js (processOrderPaid).
    // The /api/orders/send-confirmation route remains for manual re-sends from admin.
  },
};
