const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    {...props} // 외부에서 추가적인 클래스나 스타일을 props로 전달할 수 있음.
  >
    <rect width="32" height="32" fill="white" />
    <path
      d="M6 26.5V13.5L16 5L26 13.5V26.5H19.5V18.5H12.5V26.5H6Z"
      stroke="currentColor" // stroke를 currentColor로 설정
      strokeWidth="2"
    />
  </svg>
);

export default HomeIcon;
