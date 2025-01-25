import { getAuthHeaders } from './getAuthHeader';

export const getCakeDesigns = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap?scrapType=CAKE`,
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

export const toggleMark = async (cakeId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKE/${cakeId}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete scrap.');
    }

    return true;
  } catch (error) {
    console.error('Error deleting scrap:', error);
    throw error;
  }
};
