export interface ICategoryData {
  cakeName: string;
  cakePrice: number;
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
  cakeLogs?: [
    {
      cakelogId?: number;
      title?: string;
      thumbnailImage?: string;
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
    active: boolean;
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
  scraped: boolean;
  sameDay: boolean;
}

export interface OrderType {
  orderId: number;
  cakeName: string;
  cakeShopName: string;
  orderDate: string;
  pickupDate: string;
  totalPrice: number;
  status: string;
  size: string;
  lettering: string;
  imageUrl?: string;
  shopName?: string;
  selectedTastes: string[];
  color: string;
  lettercolor: string;
  paymentMethod?: string;
}

export interface cakeSearch {
  name: string;
  imageUrl: string;

  cakeShopName: string;
}
export interface OrderCardProps {
  order: OrderType;
  orderList?: boolean;
  detail?: boolean;
  cakeSearch?: cakeSearch[];
}

export interface shopLogs {
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
    active: boolean;
  };
  cakelogs: [
    {
      id: number;
      title: string;
      author: string;
      createTime: string;
      thumbnail_image: string;
      body: string;
    },
  ];
  scraped: boolean;
  sameDay: boolean;
}

export interface TimeSlotResponse {
  cakeShopId: number;
  availableTimes: string[];
}

export interface OrderhistoryDetail {
  orderId: number;
  cakeName: string;
  cakeShopName: string;
  orderDate: string;
  pickupDate: string;
  totalPrice: number;
  status: string;
  size: string;
  lettering: string;
  color: string;
  lettercolor: string;
  selectedTastes: string[];
  paymentMethod?: string;
}

export interface HomeRecommend {
  special: [
    {
      shopId: number;
      shopName: string;
      shopImg: string;
      operatingHours: {
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
        active: boolean;
      };
      region: string;
      sameDay: boolean;
    },
  ];
  trendy: [
    {
      shopId: number;
      shopName: string;
      shopImg: string;
      operatingHours: {
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
        active: boolean;
      };
      region: string;
      sameDay: boolean;
    },
  ];
}

export type priceObject = {
  min: number | undefined;
  max: number | undefined;
};
