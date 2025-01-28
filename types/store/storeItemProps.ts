import { StoreScrap } from './store-scrap';

export type StoreItemProps = {
  store: StoreScrap;
  index: number;
  marked: boolean[];
  onToggleScrap: (index: number, shopId: number) => void;
  onNavigate: (shopId: number) => void;
};
