function Add({size, color}: {size: number; color: string}) {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 11.25H12.75V3H11.25V11.25H3V12.75H11.25V21H12.75V12.75H21V11.25Z"
        fill={color}
      />
    </svg>
  );
}

export default Add;
