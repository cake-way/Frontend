export interface CakeDesign {
  id: number;
  scrapType: string;
  imageUrl: string;
  title: string;
}

export interface CakeDesignCardProps {
  design: CakeDesign;
  isMarked: boolean;
  onToggleMark: () => void;
  onClickDetail: () => void;
}

export interface CakeDesignGridProps {
  designs: CakeDesign[];
  marked: boolean[];
  onToggleMark: (index: number, cakeId: number) => void;
  onClickDetail: (cakeId: number) => void;
}
