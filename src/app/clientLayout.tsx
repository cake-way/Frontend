'use client';

import { usePathname } from 'next/navigation';
import BottomNavBar from './_components/BottomNavBar';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 로그인 페이지와 랜딩페이지에서는 BottomNavBar를 숨김.
  const shouldShowBottomNavBar = pathname !== '/' && pathname !== '/login';

  // 로그인 페이지일 때는 pb-[var(--bottom-nav-height)]를 제외
  const mainClass =
    pathname === '/login'
      ? 'w-full h-full overflow-y-scroll'
      : 'w-full h-full overflow-y-scroll pb-[var(--bottom-nav-height)]';

  return (
    <>
      <main className={mainClass}>{children}</main>
      {shouldShowBottomNavBar && <BottomNavBar />}
    </>
  );
}
