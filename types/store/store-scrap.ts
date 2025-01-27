export interface StoreScrap {
  shopId: number;
  shopImage: string;
  shopName: string;
  address: string;
  operatingHours: {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    active: boolean;
  };
  scrap: boolean;
  sameDay: boolean;
}
