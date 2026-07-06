export default {
  routes: [
    {
      method: 'POST',
      path: '/withdrawal-requests/submit',
      handler: 'withdrawal-request.submit',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
