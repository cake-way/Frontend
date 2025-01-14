'use client';

import { usePathname, useRouter } from 'next/navigation';

// 컴포넌트화 된 아이콘들
import HomeIcon from './Icons/HomeIcon';
import LogIcon from './Icons/LogIcon';
import MapIcon from './Icons/MapIcon';
import OrderIcon from './Icons/OrderIcon';
import MyLogIcon from './Icons/MyLogIcon';

const BottomNavBar = () => {
  const currentPath = usePathname(); // 현재 페이지 경로를 가져오기
  const router = useRouter(); // 라우터 훅을 사용하여 페이지 전환

  const navItems = [
    { path: '/', icon: <HomeIcon />, label: '홈' },
    { path: '/log', icon: <LogIcon />, label: '로그작성' },
    { path: '/map', icon: <MapIcon />, label: '지도' },
    {
      path: '/orderList',
      icon: <OrderIcon />,
      label: '주문내역',
    },
    {
      path: '/my-log',
      icon: <MyLogIcon />,
      label: '마이로그',
    },
  ];

  // 네비게이션 아이템을 클릭하면 해당 경로로 이동하는 함수
  const navigateToPath = (path: string) => {
    router.push(path); // 버튼 클릭 시 해당 경로로 이동
  };

  // my-log 관련 페이지들이 활성화된 경우를 체크
  const isMyLogActive = currentPath.startsWith('/my-log');

  return (
    <nav className="absolute bottom-0  w-full h-[var(--bottome-nav-height)] bg-[#FFF] z-50 flex items-center justify-between px-6 pb-4 space-x-9">
      {navItems.map(({ path, icon, label }) => {
        const isActive =
          path === '/my-log' ? isMyLogActive : currentPath === path;
        return (
          <button
            key={path}
            onClick={() => navigateToPath(path)} // 버튼 클릭 시 해당 경로로 이동
            className={`flex flex-col items-center justify-center w-14 h-16 ${isActive ? 'text-black' : 'text-grayscale600'}`}
          >
            <div>{icon}</div>
            <p className="text-[10px] mt-1 w-full text-center whitespace-nowrap">
              {label}
            </p>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
