export interface CreateLogProps {
  latestOrderShop: string | null;
}

export interface ThumbnailProps {
  thumbnailImage: string | File | null; // File 타입 추가
  setThumbnailImage: (value: string | File | null) => void; // File 타입 지원
  logTitle: string;
  setLogTitle: (value: string) => void;
  userProfileImage: string; // 프로필 사진 URL
  username: string; // 사용자 이름
}

export interface RecentOrder {
  shopId: number;
  shopName: string;
}

export interface LocationSearchProps {
  onShopSelect: (shopId: number) => void; // 부모에서 전달할 함수 타입
}

export interface AddPhotosProps {
  photos: File[];
  setPhotos: (photos: File[]) => void;
}
export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface CategorySelectorProps {
  selectedShopId: number | null;
  onSelectCategory: (categoryId: number) => void;
}
