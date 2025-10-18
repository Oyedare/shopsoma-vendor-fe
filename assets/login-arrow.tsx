const LoginArrow = () => {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_73_959)">
        <rect
          x="5"
          y="3"
          width="48"
          height="48"
          rx="12"
          fill="white"
          shapeRendering="crispEdges"
        />
        <rect
          x="5"
          y="3"
          width="48"
          height="48"
          rx="12"
          stroke="#DCDCDC"
          strokeWidth="0.5"
          shapeRendering="crispEdges"
        />
        <path
          d="M26 23V21C26 20.4696 26.2107 19.9609 26.5858 19.5858C26.9609 19.2107 27.4696 19 28 19H35C35.5304 19 36.0391 19.2107 36.4142 19.5858C36.7893 19.9609 37 20.4696 37 21V33C37 33.5304 36.7893 34.0391 36.4142 34.4142C36.0391 34.7893 35.5304 35 35 35H28C27.4696 35 26.9609 34.7893 26.5858 34.4142C26.2107 34.0391 26 33.5304 26 33V31M20 27H33M33 27L30 24M33 27L30 30"
          stroke="#3D3D3D"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_73_959"
          x="0.75"
          y="0.75"
          width="56.5"
          height="56.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_73_959"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_73_959"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LoginArrow;
