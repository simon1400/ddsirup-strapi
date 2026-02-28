export default {
  routes: [
    {
      method: 'POST',
      path: '/coupons/validate',
      handler: 'coupon.validate',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/coupons/increment-usage',
      handler: 'coupon.incrementUsage',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
