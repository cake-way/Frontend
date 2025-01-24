export default async function cakeCategorySearchApi(
  categoryName: '생일' | '파티' | string,
  time?: string,
  price?: number,
  region?: string[],
  design?: string[]
) {
  try {
    const params = new URLSearchParams();

    if (time) params.append('time', String(time));
    if (price) params.append('price', String(price));
    if (region?.length) {
      region.forEach((item) => params.append('region', item));
    }
    if (design?.length) {
      design.forEach((item) => params.append('design', item));
    }

    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cake/category/${categoryName}${params.toString() ? `?${params}` : ''}`;

    const response = await fetch(URL);
    return await response.json();
  } catch (e) {
    console.log('cakeCategorySearchApi error :', e);
  }
}
