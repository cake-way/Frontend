'use client';

import LoadingSpinner from '@/app/_components/Loading';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const LoginCallback = () => {
  const searchParams = useSearchParams(); // 클라이언트에서만 사용 가능
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code'); // URL 쿼리에서 인증 코드 추출
    if (!code) {
      alert('인증 코드가 존재하지 않습니다. 관리자에 문의해 주세요.');
      router.push('/login'); // 인증 코드가 없을 경우 로그인 페이지로 리다이렉트
      return;
    }

    const fetchKaKaoAccessToken = async () => {
      try {
        console.log('인증 코드:', code);
        console.log('백엔드 URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

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

        // 백엔드에서 받은 액세스 토큰 처리
        const { token } = await response.json();
        if (token) {
          localStorage.setItem('token', token);
          alert('로그인이 완료되었습니다!');
          router.push('/'); // 로그인 완료 후 홈으로 이동
        }
      } catch (error) {
        console.error('토큰 요청 중 에러 발생:', error);
        alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
        router.push('/login');
      }
    };

    fetchKaKaoAccessToken();
  }, [searchParams, router]);

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
