const MapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props} 
    >
      <rect width="32" height="32" fill="white" />
      <path
        d="M15.4998 4C9.00021 4 3.99977 9.5 5.99985 16.5C7.59321 22.0766 12.6771 25.4318 14.6788 26.5658C15.1935 26.8574 15.8062 26.8574 16.3209 26.5658C18.3227 25.4318 23.4067 22.0766 24.9998 16.5C26.9997 9.5 21.9996 4 15.4998 4Z"
        stroke="currentColor" 
        strokeWidth="2"
      />
      <circle
        cx="15.5"
        cy="14.5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
  
  export default MapIcon;
  