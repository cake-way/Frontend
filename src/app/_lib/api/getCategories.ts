import { getAuthHeaders } from './getAuthHeader';

export const getCategories = async (selectedShopId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${selectedShopId}`,
      {
        method: 'GET',
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cake designs');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cake designs:', error);
    throw error;
  }
};
