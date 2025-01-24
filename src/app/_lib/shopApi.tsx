export default async function shopDetailApi(
  shopId: number,
  categoryName?: string | null
) {
  try {
    const param = new URLSearchParams();

    if (categoryName) param.append('categoryName', categoryName);
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/${shopId}/menu${param.toString() ? `?${param}` : ''}`;

    const response = await fetch(URL);

    return await response.json();
  } catch (e) {
    console.log('shopDetailApi' + e);
  }
}

export async function getShopAdress(shopId: number | undefined) {
  if (!shopId) return;
  return await shopDetailApi(shopId);
}

export async function shopCategoryApi(shopId: string) {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${shopId}`;
    const response = await fetch(URL);
    return await response.json();
  } catch (e) {
    console.log('shopCategoryApi' + e);
  }
}
