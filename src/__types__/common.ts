export type Address = {
  _id?: string;
  zip: number;
  name: string;
  phone: string;
  street1: string;
  city: string;
  state: string;
  country: string;
  user?: string;
  street2?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  termsAndCondition?: boolean;
  role: string;
  phone?: string;
  dateOfBirth?: Date;
};

type sku = {
  sku: string;
  _id: string;
  unit: string;
  color: string[];
  quantity: number;
  image: { key: string; location: string }[];
  price: { base: number; currency: number; discount: number };
};

export type Product = {
  _id: string;
  skus: sku[];
  item: string;
  tags?: string[];
  features: string[];
  categories: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  _id: string;
  icon: string;
  name: string;
  slug: string;
  child?: any[];
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryNavList = {
  name: string;
  slug: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItems = {
  _id?: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  productId: string;
};

export type Order = {
  _id: string;
  customerId: string;
  status: string;
  currency: string;
  items: OrderItems[];
  discount: number;
  preTaxTotal: number;
  tax: number;
  total: number;
  shipping: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentId: any;
  paymentStatus: string;
  deliveredAt: Date;
  isDelivered: boolean;
  createdAt: Date;
  updatedAt: Date;
  paymentType: string;
};

export type CartItem = {
  qty: number;
  name: string;
  price: number;
  imgUrl?: string;
  id: string | number;
};

export type SliderProductType = {
  _id: string;
  name: string;
  slug: string;
  heading: string;
  description?: string;
  products: Product[];
};

export type SettingType = {
  _id: string;
  slug: string;
  name: string;
  values: any;
};

export type TopbarSetting = {
  phone: string;
  email: string;
  links: { _id: string; name: string; link: string }[];
};

export type Service = {
  _id: string;
  icon: string;
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  subTitle: string;
};

export type BannerItem = {
  key: string;
  location: string;
};

export type CreditCard = {
  name: string;
  cardId: string;
  cardType: string;
  cardLast4: string;
  cardExpYear: number;
  cardExpMonth: number;
};
