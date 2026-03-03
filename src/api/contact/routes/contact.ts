export default {
  routes: [
    {
      method: 'POST',
      path: '/contacts/submit',
      handler: 'contact.create',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
