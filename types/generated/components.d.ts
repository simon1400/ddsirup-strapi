import type { Schema, Struct } from '@strapi/strapi';

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

export interface ShopProductInfoBox extends Struct.ComponentSchema {
  collectionName: 'components_shop_product_info_boxes';
  info: {
    displayName: 'Product Info Box';
    icon: 'information';
  };
  attributes: {
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
    sku: Schema.Attribute.String;
    stock: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    volume: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.nav-item': LayoutNavItem;
      'shop.address': ShopAddress;
      'shop.product-info-box': ShopProductInfoBox;
      'shop.product-variant': ShopProductVariant;
    }
  }
}
