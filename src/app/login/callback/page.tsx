'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginCallback = () => {
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code'); // 카카오에서 받은 인증 코드 추출
  const router = useRouter();

  useEffect(() => {
    const fetchKaKaoAccessToken = async () => {
      try {
        if (!authCode) {
          // 인증 코드가 없을 경우 로그인 페이지로 리다이렉트
          alert('인증 코드가 존재하지 않습니다. 관리자에 문의해 주세요.');
          router.push('/login'); // 로그인 페이지로 이동
          return;
        }

        // 인증 코드를 백엔드로 전송
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/kakao/callback`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ code: authCode }), // POST 요청으로 인증 코드 전송
          }
        );

        if (!response.ok) {
          throw new Error('서버 요청 실패');
        }

        // 백엔드에서 받은 액세스 토큰 추출 (임시)
        const { access_token } = await response.json();
        if (access_token) {
          localStorage.setItem('access_token', access_token);
          alert('로그인이 완료되었습니다!'); // 모달 만들기?
          router.push('/');
        }
      } catch (error) {
        console.error('토큰 요청 중 에러 발생:', error);
        alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
        router.push('/login'); // 에러 발생 시 로그인 페이지로 이동
      }
    };

    fetchKaKaoAccessToken();
  }, [authCode, router]);

  return <div>로딩 컴포넌트 하나 생성하기</div>;
};

export default LoginCallback;
