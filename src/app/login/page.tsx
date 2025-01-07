'use client';

const Login = () => {
  return (
    <div className="w-full h-screen bg-black flex flex-col justify-center items-center text-white">
      {/* 로고 */}
      <div className="mb-6">
        <img
          src="/logo.png" // 로고 이미지 경로 (임시시)
          alt="CAKEWAY 로고"
          className="w-40 h-auto"
        />
      </div>

      {/* 텍스트 */}
      <div className="mb-10 text-center font-sans">
        <p className="mt-2 text-sm font-sans">
          쉽고 빠른 케이크 주문은 케이크 웨이로
        </p>
      </div>

      {/* 카카오 로그인 버튼 */}
      <button
        className="flex items-center justify-center w-72 h-12 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-500 transition"
        onClick={() => alert('카카오로 시작하기')}
      >
        <img
          src="/kakao-icon.png" // 카카오 로고 이미지 경로
          alt="카카오 로고"
          className="w-6 h-6 mr-3"
        />
        카카오 계정으로 로그인
      </button>
    </div>
  );
};

export default Login;
