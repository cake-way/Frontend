export interface Cake {
  cakeId: number;
  name: string;
  imageUrl: string;
  price: number;
  scrapCount: number;
  shopName: string;
  isScrapped: boolean;
}

export interface Shop {
  shopId: number;
  name: string;
  address: string;
  contact: string;
  thumbnailImage: string;
  distance: number;
  isScrapped: boolean;
  cakes: Cake[];
}
