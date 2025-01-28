export interface MyCakeLogProps {
  cakelogs: Array<{
    cakeLogid: number;
    username: string;
    cakeShopName: string;
    cakeCategoryName: string;
    title: string;
    thumbnailImage: string;
    body: string;
    isPublic: true;
    imageList: [string];
  }>;
}
