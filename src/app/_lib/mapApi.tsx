export default async function searchMapApi(keyword, lat, lng, isSameDay) {
  try {
    const param = new URLSearchParams;
    param.append("keyword",keyword)
    param.append("longitude",lng)
    param.append("latitude",lat)
    if(isSameDay) param.append("isSameDay", isSameDay)
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/map/shops/${}`;
    const response = await fetch(URL);

    return response.json();
  } catch (e) {
    console.log('orderApi POST error:', e);
  }
}
