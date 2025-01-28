interface OperatingHour {
  dayOfWeek: string;
  openTime: {
    hour: number;
    minute: number;
  };
  closeTime: {
    hour: number;
    minute: number;
  };
  active: boolean;
}

interface CakeShopDto {
  shopId: string;
  shopName: string;
  operatingHour: OperatingHour;
}

interface curationCakelog {
  cakelogId: number;
  username: string;
  userId: number;
  shopDto: CakeShopDto[];
  body: string;
  imageUrls: string[];
}

export interface Log {
  curationId: number;
  title: string;
  thumbnailImage: string;
  description: string;
  curationCakelog: curationCakelog[];
}
