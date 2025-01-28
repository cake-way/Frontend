import { getAuthHeaders } from './api/getAuthHeader';

export default async function cakeCategorySearchApi(
  categoryName: '생일' | '파티' | string,
  time?: string | null,
  price?: number | null,
  region?: string[] | null,
  design?: string[] | null
) {
  try {
    const params = new URLSearchParams();

    if (time) params.append('time', String(time));
    if (price) params.append('price', String(price * 10000));
    if (region?.length) {
      region.forEach((item) => params.append('region', item));
    }
    if (design?.length) {
      design.forEach((item) => params.append('design', item));
    }

    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cake/category/${categoryName}${params.toString() ? `?${params}` : ''}`;
    console.log(URL);
    const response = await fetch(URL, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return await response.json();
  } catch (e) {
    console.log('cakeCategorySearchApi error :', e);
  }
}
