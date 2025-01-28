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

export const toggleScrap = async (
  cakeLogid: string | number,
  isScraped: boolean
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKELOG/${cakeLogid}`,
      {
        method: isScraped ? 'DELETE' : 'POST', // 스크랩 상태에 따라 POST 또는 DELETE 요청
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error('스크랩 상태를 업데이트하는 데 실패했습니다.');
    }
  } catch (error) {
    console.error('스크랩 상태 업데이트 실패', error);
    throw error;
  }
};
