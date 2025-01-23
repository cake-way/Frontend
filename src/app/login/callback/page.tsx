'use client';

import LoadingSpinner from '@/app/_components/Loading';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import useUserStore from '@/app/store/userStore';

const LoginCallback = () => {
  const searchParams = useSearchParams(); // 카카오 인증 코드 추출
  const router = useRouter();
  const setUserInfo = useUserStore((state) => state.setUserInfo); // 로그인한 사용자 관리

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      alert('인증 코드가 존재하지 않습니다. 관리자에 문의해 주세요.');
      router.push('/login');
      return;
    }

    const fetchKaKaoAccessToken = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/kakao/callback?code=${code}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('서버 요청 실패');
        }

        const { token } = await response.json();
        if (token) {
          localStorage.setItem('token', token); // 액세스 토큰 저장
          alert('로그인이 완료되었습니다!');

          // 마이페이지 api 호출해서 memberId get
          const fetchUserInfo = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/mypage`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!fetchUserInfo.ok) {
            throw new Error('사용자 정보 요청 실패');
          }

          const userData = await fetchUserInfo.json();

          // Zustand에 사용자 정보 저장
          setUserInfo(userData);

          router.push('/home'); // 홈 페이지로 이동
        }
      } catch (error) {
        console.error('로그인 처리 중 에러 발생:', error);
        alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
        router.push('/login');
      }
    };

    fetchKaKaoAccessToken();
  }, [searchParams, router, setUserInfo]);

  return <LoadingSpinner />;
};

const LoginCallbackWrapper = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginCallback />
    </Suspense>
  );
};

export default LoginCallbackWrapper;
