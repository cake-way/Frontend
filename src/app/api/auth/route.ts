import { NextResponse } from 'next/server';

export async function GET() {
  const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID; // 클라이언트 ID는 서버에서 안전하게 처리
  const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI; // 리디렉션 URI

  if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
    return NextResponse.json(
      { error: '환경 변수가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  return NextResponse.json({ authUrl: kakaoAuthUrl });
}
