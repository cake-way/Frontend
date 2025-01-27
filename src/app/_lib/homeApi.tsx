export async function homeRecommendApi() {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home}`;
    const response = await fetch(URL);

    return response.json();
  } catch (e) {
    console.log('homeRecommendApi error:', e);
  }
}
