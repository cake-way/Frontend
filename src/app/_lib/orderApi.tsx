interface OrderRequestBody {
  memberId: number;
  cakeId: number;
  orderDate: string; // ISO 8601 형식의 날짜 문자열
  pickupDate: string; // ISO 8601 형식의 날짜 문자열
  size: string; // 케이크 사이즈
  lettering: string; // 레터링 문구
  color: string; //
  lettercolor: string;
  selectedOptionIds: number[];
}

export default async function orderApi(body: OrderRequestBody) {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`;
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(body),
    });
    console.log(response);

    return response.json();
  } catch (e) {
    console.log('orderApi POST error:', e);
  }
}

export async function orderHistoryApi(memberId: number) {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/history/${memberId}`;
    const response = await fetch(URL);

    return response.json();
  } catch (e) {
    console.log('orderHistoryApi  error:', e);
  }
}

export async function orderHistoryGetCakeApi(keyword: string | undefined) {
  try {
    if (!keyword) return;
    const params = new URLSearchParams();
    params.append('keyword', keyword);
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/cakes?${params}`;
    const response = await fetch(URL);

    return response.json();
  } catch (e) {
    console.log('orderHistoryGetCakeApi error:', e);
  }
}

export async function orderHistoryDetailApi(memberId: number, orderId: number) {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/history/${memberId}/${orderId}`;
    const response = await fetch(URL);

    return response.json();
  } catch (e) {
    console.log('orderHistoryDetailApi error:', e);
  }
}

export async function orderOptionApi(cakeId: number) {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/option/${cakeId}`;
    const response = await fetch(URL);

    return response.json();
  } catch (e) {
    console.log('orderOptionApi error:', e);
  }
}
