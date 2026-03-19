export default {
  routes: [
    {
      method: 'POST',
      path: '/wholesale-contacts/submit',
      handler: 'wholesale-contact.create',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
