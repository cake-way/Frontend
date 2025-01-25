import { getAuthHeaders } from './getAuthHeader';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchCakelogData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/cakelog`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching cakelog data:', error);
    throw error;
  }
};
