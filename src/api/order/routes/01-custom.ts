export default {
  routes: [
    {
      method: 'POST',
      path: '/orders/assign-invoice-number',
      handler: 'order.assignInvoiceNumber',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
