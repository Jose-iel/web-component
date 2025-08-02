import { IconBase, IconProps, defaultWidth, defaultHeight } from './IconBase';

export const IconCity = ({ width = defaultWidth, height = defaultHeight, color = 'currentColor', ...rest }: IconProps) => (
  <IconBase
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0_4567_3769)">
      <path d="M1.33325 14.6667L14.6666 14.6667" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path d="M1.33325 14.6667L14.6666 14.6667" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path d="M4 7.33331L7.33333 7.33331" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path d="M4 10L7.33333 10" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path d="M4 12.6667L7.33333 12.6667" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path
        d="M13.3333 14.6666V5.99998C13.3333 5.63179 13.0348 5.33331 12.6666 5.33331H7.99992C7.63173 5.33331 7.33325 5.63179 7.33325 5.99998V14.6666"
        stroke={color}
        strokeWidth="0.933333"
        strokeLinecap="round"
      />
      <path d="M2.66675 14.6667V1" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path
        d="M2.66675 2L10.1361 3.5561C10.4452 3.62051 10.6667 3.89297 10.6667 4.20876L10.6667 5.33333"
        stroke={color}
        strokeWidth="0.933333"
        strokeLinecap="round"
      />
      <path d="M9.33325 8V8.66667" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path d="M9.33325 10V10.6667" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path d="M9.33325 12V12.6667" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path d="M11.3333 8V8.66667" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path d="M11.3333 10V10.6667" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
      <path d="M11.3333 12V12.6667" stroke={color} strokeWidth="0.933333" strokeLinecap="round" />
    </g>
    <defs>
      <clipPath id="clip0_4567_3769">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </IconBase>
);

export default IconCity;
