import { getAuthHeaders } from './getAuthHeader';

export const fetchLogDetail = async (cakeLogid: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cakelog/${cakeLogid}`,
      {
        method: 'GET',
        headers: getAuthHeaders(),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('데이터 조회 중 오류 발생:', error);
    throw error;
  }
};
