export default async function shopDetailApi(shopId: number) {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/${shopId}}`;
    const response = await fetch(URL);
    if (!response.ok) throw Error;

    return await response.json();
  } catch (e) {
    console.log('shopDetailApi' + e);
  }
}

export async function getShopAdress(shopId: number | undefined) {
  if (!shopId) return;
  return await shopDetailApi(shopId);
}
