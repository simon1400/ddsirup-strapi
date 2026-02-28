import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::coupon.coupon', ({ strapi }) => ({
  async validate(ctx) {
    const { code, subtotal = 0 } = ctx.request.body as { code: string; subtotal: number };

    if (!code) {
      return ctx.badRequest('Kód kupónu je povinný');
    }

    const results = await strapi.documents('api::coupon.coupon').findMany({
      filters: {
        code: code.toUpperCase(),
        isActive: true,
      },
    });

    const coupon = results?.[0];

    if (!coupon) {
      return ctx.notFound('Kupón nebyl nalezen nebo není aktivní');
    }

    // Check expiry
    if (coupon.expiresAt && new Date(coupon.expiresAt as string) < new Date()) {
      return ctx.badRequest('Platnost kupónu vypršela');
    }

    // Check max uses
    if (coupon.maxUses !== null && coupon.maxUses !== undefined && (coupon.usedCount as number) >= (coupon.maxUses as number)) {
      return ctx.badRequest('Kupón byl již použit maximální počet krát');
    }

    // Check min order amount
    if (coupon.minOrderAmount && subtotal < (coupon.minOrderAmount as number)) {
      return ctx.badRequest(
        `Minimální hodnota objednávky pro tento kupón je ${coupon.minOrderAmount} Kč`
      );
    }

    // Calculate discount
    let discountAmount: number;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * (coupon.discountValue as number)) / 100);
    } else {
      discountAmount = Math.min(coupon.discountValue as number, subtotal);
    }

    return ctx.send({
      data: {
        documentId: coupon.documentId,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        minOrderAmount: coupon.minOrderAmount ?? null,
        description: coupon.description ?? null,
      },
    });
  },

  async incrementUsage(ctx) {
    const { code } = ctx.request.body as { code: string };

    if (!code) {
      return ctx.badRequest('Kód kupónu je povinný');
    }

    const results = await strapi.documents('api::coupon.coupon').findMany({
      filters: { code: code.toUpperCase() },
    });

    const coupon = results?.[0];
    if (!coupon) {
      return ctx.notFound('Kupón nebyl nalezen');
    }

    await strapi.documents('api::coupon.coupon').update({
      documentId: coupon.documentId,
      data: {
        usedCount: ((coupon.usedCount as number) ?? 0) + 1,
      },
    });

    return ctx.send({ ok: true });
  },
}));
