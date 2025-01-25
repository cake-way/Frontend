import { getAuthHeaders } from './getAuthHeader';

export const fetchCakesData = async (keyword: string) => {
  if (!keyword) return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/cakes?keyword=${keyword}`,
    {
      method: 'GET',
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch cakes');
  }

  return response.json();
};

export const fetchShopsData = async (
  keyword: string,
  latitude: number,
  longitude: number
) => {
  if (!keyword) return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/shops?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`,
    {
      method: 'GET',
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch shops');
  }

  return response.json();
};

export const scrapCake = async (cakeId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKE/${cakeId}`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('스크랩에 실패했습니다.');
    }

    return response.ok;
  } catch (error) {
    console.error('스크랩 API 호출 중 오류:', error);
    throw error;
  }
};

export const scrapShop = async (shopId: number, isScrapped: boolean) => {
  try {
    const method = isScrapped ? 'DELETE' : 'POST';
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKESHOP/${shopId}`,
      {
        method,
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('가게 스크랩 처리에 실패했습니다.');
    }

    return response.ok;
  } catch (error) {
    console.error('가게 스크랩 처리 중 오류 발생:', error);
    throw error;
  }
};
