export default async function cakeDetailApi(cakeId: number) {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cakes/${cakeId}`;
    const response = await fetch(URL);
    if (!response) throw Error;

    return await response.json();
  } catch (e) {
    console.log('cakeDetailApi' + e);
  }
}
