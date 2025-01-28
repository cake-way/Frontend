import { getAuthHeaders } from './getAuthHeader';

export const fetchScrapLogs = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap?scrapType=CAKELOG`,
      {
        method: 'GET',
        headers: getAuthHeaders(),
      }
    );
    if (!response.ok) {
      throw new Error('스크랩 데이터를 가져오는 데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const toggleMarkScrap = async (cakeLogId: number, isMarked: boolean) => {
  try {
    const method = isMarked ? 'DELETE' : 'POST'; // Mark 상태에 따라 DELETE 또는 POST 요청
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/scrap/CAKELOG/${cakeLogId}`;
    const response = await fetch(url, {
      method,
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('스크랩을 삭제하는 데 실패했습니다.');
    }
    return response.ok;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
