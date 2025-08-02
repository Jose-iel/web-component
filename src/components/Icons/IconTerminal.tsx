import { IconBase, IconProps, defaultWidth, defaultHeight } from './IconBase';

export const IconTerminal = ({ width = defaultWidth, height = defaultHeight, color = 'currentColor', ...rest }: IconProps) => (
  <IconBase
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M11.3333 13.6667V14.6667" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.66675 13.6667V14.6667" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M2.66675 4.52125C2.66675 4.09502 2.66675 3.8819 2.78266 3.62238C2.89857 3.36286 3.01626 3.25738 3.25165 3.04644C4.02299 2.35519 5.57361 1.33334 8.00008 1.33334C10.4265 1.33334 11.9771 2.35519 12.7485 3.04644C12.9839 3.25738 13.1016 3.36286 13.2175 3.62238C13.3334 3.8819 13.3334 4.09502 13.3334 4.52125V9.33334C13.3334 11.2189 13.3334 12.1617 12.7476 12.7475C12.1618 13.3333 11.219 13.3333 9.33341 13.3333H6.66675C4.78113 13.3333 3.83832 13.3333 3.25253 12.7475C2.66675 12.1617 2.66675 11.2189 2.66675 9.33334V4.52125Z"
      stroke={color}
      strokeLinejoin="round"
    />
    <path
      d="M2.66675 9.33334C2.66675 9.33334 5.15563 10 8.00008 10C10.8445 10 13.3334 9.33334 13.3334 9.33334"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M3 11.6667H4" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11.6667H13" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.33325 11.6667H8.66659" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.66675 4H13.3334" stroke={color} strokeLinejoin="round" />
    <path d="M1.33325 6V6.66667" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.6667 6V6.66667" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </IconBase>
);

export default IconTerminal;
