export const updateProfile = async (
  token: string | null,
  formData: FormData
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/mypage`,
      {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰 헤더 추가
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to update profile: ${errorMessage}`);
    }

    console.log('프로필 수정 완료:', await response.json());
  } catch (error) {
    console.error('프로필 수정 중 에러 발생:', error);
    throw error; // 호출한 쪽에서 에러를 처리할 수 있도록 던짐
  }
};
