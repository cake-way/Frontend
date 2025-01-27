import { getAuthHeaders } from '@/app/_lib/api/getAuthHeader';

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

export const fetchStoreScrapData = async (): Promise<StoreScrap[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap?scrapType=CAKESHOP`,
      {
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch scrap data.');
    }

    const data = await response.json();
    return data as StoreScrap[];
  } catch (error) {
    console.error('Error fetching scrap data:', error);
    throw error;
  }
};

export const toggleScrapMark = async (shopId: number): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKESHOP/${shopId}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete scrap.');
    }
  } catch (error) {
    console.error('Error deleting scrap:', error);
    throw error;
  }
};
