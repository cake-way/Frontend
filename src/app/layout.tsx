import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CAKEWAY',
  description: '케이크 주문제작 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Fonts에서 Pretendard 폰트 추가 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
