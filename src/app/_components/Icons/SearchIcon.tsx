interface ISearchIcon {
  focus: boolean;
}

export default function SearchIcon({ focus }: ISearchIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M3.75 8.33333C3.75 5.80202 5.80202 3.75 8.33333 3.75C10.8647 3.75 12.9167 5.80202 12.9167 8.33333C12.9167 10.8647 10.8647 12.9167 8.33333 12.9167C5.80202 12.9167 3.75 10.8647 3.75 8.33333ZM8.33333 2.5C5.11168 2.5 2.5 5.11168 2.5 8.33333C2.5 11.555 5.11168 14.1667 8.33333 14.1667C9.719 14.1667 10.9918 13.6835 11.9926 12.8765L16.4331 17.3169C16.6772 17.561 17.0728 17.561 17.3169 17.3169C17.561 17.0728 17.561 16.6772 17.3169 16.4331L12.8765 11.9926C13.6835 10.9918 14.1667 9.719 14.1667 8.33333C14.1667 5.11168 11.555 2.5 8.33333 2.5Z"
        fill={focus ? '#000000 ' : '#B4B4B4'}
      />
    </svg>
  );
}
