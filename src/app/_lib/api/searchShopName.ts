import { getAuthHeaders } from './getAuthHeader';

export const fetchShopName = async (keyword: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/search?shopName=${keyword}`,
    {
      method: 'GET',
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('해당 가게를 찾지 못했습니다.');
  }

  const data = await response.json();
  return data;
};
