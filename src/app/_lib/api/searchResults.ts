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
