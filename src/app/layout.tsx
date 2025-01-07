import type { Metadata } from 'next';
import './globals.css';
import ClientWrapper from './clientLayout';

export const metadata: Metadata = {
  title: 'CAKEWAY',
  description: '케이크 주문제작 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Google Fonts에서 Pretendard 폰트 추가 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans scrollbar-hidden">
        <div className="w-full h-full relative">
          {/* 클라이언트 컴포넌트로 분리된 ClientWrapper 사용 */}
          <ClientWrapper>{children}</ClientWrapper>
        </div>
      </body>
    </html>
  );
}
