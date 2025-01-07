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
    <html lang="en">
      <body>
        {/* 페이지 콘텐츠 */}
        <main>{children}</main>

        {/* BottomNavBar 컴포넌트 */}
        <BottomNavBar />
      </body>
    </html>
  );
}
