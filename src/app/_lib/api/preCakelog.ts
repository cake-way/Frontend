import { getAuthHeaders } from './getAuthHeader';

export const fetchRecentOrders = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/preCakelog`,
    {
      method: 'GET',
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('최근 주문 내역을 가져오지 못했습니다.');
  }

  const data = await response.json();
  return data.recentOrderList || []; // 데이터가 없으면 빈 배열 반환
};
