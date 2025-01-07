import type { Metadata } from 'next';
import './globals.css';
import BottomNavBar from './components/BottomNavBar';

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
      <body className="font-sans scrollbar-hidden">
        <div className="w-full h-full relative">
          <main className="overflow-y-scroll w-full h-full flex flex-col">
            {children}
            {/* BottomNavBar 컴포넌트 */}
          </main>
          <BottomNavBar />
        </div>
      </body>
    </html>
  );
}
