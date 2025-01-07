"use client";

import { usePathname, useRouter } from "next/navigation";

// 컴포넌트화 된 아이콘들
import HomeIcon from "./Icons/HomeIcon";
import LogIcon from "./Icons/LogIcon";
import MapIcon from "./Icons/MapIcon";
import OrderIcon from "./Icons/OrderIcon";
import MyLogIcon from "./Icons/MyLogIcon";


const BottomNavBar = () => {
    const currentPath = usePathname(); // 현재 페이지 경로를 가져오기
    const router = useRouter(); // 라우터 훅을 사용하여 페이지 전환

    const navItems = [
        { path: "/", icon: <HomeIcon className="w-6 h-6" />, label: "홈" },
        { path: "/log", icon: <LogIcon className="w-6 h-6" />, label: "로그작성" },
        { path: "/map", icon: <MapIcon className="w-6 h-6" />, label: "지도" },
        { path: "/order", icon: <OrderIcon className="w-6 h-6" />, label: "주문내역" },
        { path: "/my-log", icon: <MyLogIcon className="w-6 h-6" />, label: "마이로그" },
    ];

    // 네비게이션 아이템을 클릭하면 해당 경로로 이동하는 함수
    const navigateToPath = (path: string) => {
        router.push(path); // 버튼 클릭 시 해당 경로로 이동
    };

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-[80px] bg-white z-50 flex items-center justify-between px-6 pb-4 border border-gray-300 space-x-9">
            {navItems.map(({ path, icon, label }) => {
                const isActive = currentPath === path;
                return (
                    <button
                        key={path}
                        onClick={() => navigateToPath(path)} // 버튼 클릭 시 해당 경로로 이동
                        className={`flex flex-col items-center justify-center w-14 h-16 ${isActive ? "text-black" : "text-[#949494]"}`}
                    >
                        <div className="w-6 h-6">
                            {icon}
                        </div>
                        <p className="text-[10px] mt-1 w-full text-center whitespace-nowrap">{label}</p>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNavBar;