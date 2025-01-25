import React from 'react';

const MarkIcon = (props: React.SVGProps<SVGSVGElement> & { fill?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="19"
    viewBox="0 0 14 19"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.448242 0.929688H13.5513V18.6936L6.99975 14.4048L0.448242 18.6936V0.929688ZM1.94824 2.42969V15.9188L6.99975 12.6119L12.0513 15.9188V2.42969H1.94824Z"
      fill={props.fill || 'gray'}
    />
  </svg>
);

export default MarkIcon;
