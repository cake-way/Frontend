const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchCakelogData = async (token: string | null) => {
  if (!token) {
    throw new Error('Authentication token is missing.');
  }

  try {
    const response = await fetch(`${BACKEND_URL}/cakelog`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
