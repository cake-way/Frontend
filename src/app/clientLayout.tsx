'use client';

import { usePathname } from 'next/navigation';
import BottomNavBar from './components/BottomNavBar';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  //로그인 페이지("/")에서는 BottomNavBar를 숨김.
  const shouldShowBottomNavBar = pathname !== '/login';

  return (
    <>
      <main className="overflow-y-scroll w-full h-full flex flex-col">
        {children}
      </main>
      {shouldShowBottomNavBar && <BottomNavBar />}
    </>
  );
}
