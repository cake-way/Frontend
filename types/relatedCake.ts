export interface ICategoryData {
  cakeName: string;
  cakeprice: number;
  cakeImage: string;
  cakeId: number;
  scrapCount: number;
  isScraped: boolean;
}

export interface ICakeDetail {
  cakeId: number;
  cakeName: string;
  price: number;
  imageUrl: string;
  scrapCount: number;
  shopId: number;
  shopName: string;
  shopThumbnail: string;
  cakeLogCount: number;
  otherCakes: [
    {
      cakeId: number;
      name: string;
      price: number;
      imageUrl: string;
    },
  ];
  cakeLogs: [
    {
      cakelogId: number;
      title: string;
      thumbnailImage: string;
    },
  ];
}

export interface IShopDetail {
  name: string;
  address: string;
  contact: string;
  instagram: string;
  scrapCount: number;
  operatingHour: {
    dayOfWeek: string;
    openTime: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
    closeTime: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
    active: true;
  };
  cakes: {
    cakeCategoryResponseDtos: [
      {
        categoryId: number;
        categoryName: string;
      },
    ];
    categoryId: number;
    name: string;
    cakes: [
      {
        cakeId: number;
        cakeName: string;
        thumnailUrl: string;
        price: number;
      },
    ];
  };
  scraped: true;
  sameDay: true;
}

export interface OrderType {
  orderId: number;
  cakeName: string;
  orderDate: string;
  pickupDate: string;
  totalPrice: number;
  status: string;
  size: string;
  lettering: string;
  imageUrl?: string;
  shopName?: string;
}

export interface cakeSearch {
  cakeId: number;
  name: string;
  imageUrl: string;
  price: number;
  scrapCount: number;
  shopName: string;
}
export interface OrderCardProps {
  order: OrderType;
  orderList?: boolean;
  detail?: boolean;
  cakeSearch?: cakeSearch[];
}
