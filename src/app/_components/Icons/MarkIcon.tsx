import React from 'react';

const MarkIcon = (props: React.SVGProps<SVGSVGElement> & { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.44849 2.92969H18.5515V20.6936L12 16.4048L5.44849 20.6936V2.92969ZM6.94849 4.42969V17.9188L12 14.6119L17.0515 17.9188V4.42969H6.94849Z"
      fill={props.fill || 'gray'}
    />
  </svg>
);

export default MarkIcon;
