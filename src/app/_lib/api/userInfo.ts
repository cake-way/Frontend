import { getAuthHeaders } from './getAuthHeader';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUserInfo = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/mypage`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `사용자 정보를 가져오지 못했습니다: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`서버 요청 중 오류 발생: ${error}`);
  }
};
