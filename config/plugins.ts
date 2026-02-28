import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-imagekit',
      providerOptions: {
        publicKey: env('IMAGEKIT_PUBLIC_KEY'),
        privateKey: env('IMAGEKIT_PRIVATE_KEY'),
        urlEndpoint: env('IMAGEKIT_URL_ENDPOINT'),
      },
    },
  },
  'sortable-entries': {
    enabled: true,
  },
  seo: {
    enabled: true,
  },
});

export default config;
