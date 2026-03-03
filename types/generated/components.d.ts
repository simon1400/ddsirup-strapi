import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsFeatureBlock extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature_blocks';
  info: {
    displayName: 'Feature Block';
    icon: 'puzzle-piece';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          output: 'HTML';
          preset: 'defaultHtml';
        }
      >;
    icon: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_links';
  info: {
    displayName: 'Footer Link';
    pluralName: 'footer-links';
    singularName: 'footer-link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutFooterNavGroup extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_nav_groups';
  info: {
    displayName: 'Footer Nav Group';
    pluralName: 'footer-nav-groups';
    singularName: 'footer-nav-group';
  };
  attributes: {
    links: Schema.Attribute.Component<'layout.footer-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutNavItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_items';
  info: {
    displayName: 'Nav Item';
    pluralName: 'nav-items';
    singularName: 'nav-item';
  };
  attributes: {
    category: Schema.Attribute.Relation<'manyToOne', 'api::category.category'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String;
  };
}

export interface SectionsCategoriesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_categories_sections';
  info: {
    displayName: 'Categories Section';
    icon: 'apps';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          output: 'HTML';
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsContactForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_forms';
  info: {
    displayName: 'Contact Form';
    icon: 'envelope';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFeatures extends Struct.ComponentSchema {
  collectionName: 'components_sections_features';
  info: {
    displayName: 'Features';
    icon: 'star';
  };
  attributes: {
    blocks: Schema.Attribute.Component<'elements.feature-block', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    icon: 'landscape';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface SectionsProductsSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_products_sliders';
  info: {
    displayName: 'Products Slider';
    icon: 'grid';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_sections';
  info: {
    displayName: 'Text Section';
    icon: 'pencil';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          output: 'HTML';
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface ShopAddress extends Struct.ComponentSchema {
  collectionName: 'components_shop_addresses';
  info: {
    description: '';
    displayName: 'Address';
    icon: 'map-marker';
  };
  attributes: {
    city: Schema.Attribute.String & Schema.Attribute.Required;
    company: Schema.Attribute.String;
    country: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'CZ'>;
    dic: Schema.Attribute.String;
    ico: Schema.Attribute.String;
    street: Schema.Attribute.String & Schema.Attribute.Required;
    streetLine2: Schema.Attribute.String;
    zip: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ShopOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_shop_order_items';
  info: {
    description: 'Single item in a customer order';
    displayName: 'Order Item';
    icon: 'shoppingCart';
  };
  attributes: {
    productName: Schema.Attribute.String & Schema.Attribute.Required;
    productSlug: Schema.Attribute.String;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    thumbnail: Schema.Attribute.String;
    totalPrice: Schema.Attribute.Decimal & Schema.Attribute.Required;
    unitPrice: Schema.Attribute.Decimal & Schema.Attribute.Required;
    variantName: Schema.Attribute.String;
    variantVolume: Schema.Attribute.String;
  };
}

export interface ShopProductInfoBox extends Struct.ComponentSchema {
  collectionName: 'components_shop_product_info_boxes';
  info: {
    displayName: 'Product Info Box';
    icon: 'information';
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ShopProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_shop_product_variants';
  info: {
    description: '';
    displayName: 'Product Variant';
    icon: 'layer';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal;
    stock: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    volume: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.feature-block': ElementsFeatureBlock;
      'layout.footer-link': LayoutFooterLink;
      'layout.footer-nav-group': LayoutFooterNavGroup;
      'layout.nav-item': LayoutNavItem;
      'sections.categories-section': SectionsCategoriesSection;
      'sections.contact-form': SectionsContactForm;
      'sections.features': SectionsFeatures;
      'sections.hero': SectionsHero;
      'sections.products-slider': SectionsProductsSlider;
      'sections.text-section': SectionsTextSection;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
      'shop.address': ShopAddress;
      'shop.order-item': ShopOrderItem;
      'shop.product-info-box': ShopProductInfoBox;
      'shop.product-variant': ShopProductVariant;
    }
  }
}
