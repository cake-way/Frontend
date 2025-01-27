export default async function searchMapApi(lat, lng, isSameDay, keyword?) {
  try {
    const param = new URLSearchParams();

    param.append('latitude', lat);
    param.append('longitude', lng);
    if (keyword) param.append('keyword', keyword);
    if (isSameDay) param.append('isSameDay', isSameDay);
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/map/shops/?${param}`;
    const response = await fetch(URL);

    return response.json();
  } catch (e) {
    console.log('searchMapApi error:', e);
  }
}
