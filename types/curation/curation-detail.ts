export interface Log {
  curationId: number;
  title: string;
  description: string;
  thumbnailImage: string;
  curationCakelog: CurationCakelog[];
}

export interface CurationCakelog {
  cakelogId: number;
  shopDto: ShopDto;
  userId: number;
  username: string;
  body: string;
  imageUrls: string[];
}

export interface ShopDto {
  shopId: number;
  shopName: string;
  operatingHours: OperatingHours;
  scrap: boolean;
}

export interface OperatingHours {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  active: boolean;
}
