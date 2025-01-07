const MyLogIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      {...props}
    >
      <path
        d="M24 20H8.5C7.94772 20 7.49587 20.4494 7.58164 20.995C7.99556 23.6279 10.0899 27.5 16.25 27.5C22.4101 27.5 24.5044 23.6279 24.9184 20.995C25.0041 20.4494 24.5523 20 24 20Z"
        stroke="currentColor" 
        strokeWidth="2"
      />
      <circle
        cx="16.25"
        cy="10.75"
        r="4.75"
        stroke="currentColor" 
        strokeWidth="2"
      />
    </svg>
  );
  
  export default MyLogIcon;
  