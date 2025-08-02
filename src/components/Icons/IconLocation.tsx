import { FC } from 'react';
import { IconBase, defaultWidth, defaultHeight, IconProps } from './IconBase';

export interface IconLocationProps extends Omit<IconProps, 'children'> {
  width?: string;
  height?: string;
  color?: string;
}

export const IconLocation: FC<IconLocationProps> = ({ 
  width = defaultWidth, 
  height = defaultHeight, 
  color = 'currentColor', 
  ...rest 
}) => (
  <IconBase
    width={width}
    height={height}
    viewBox="0 0 15 17"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.71029 6.08333C6.90612 6.08333 6.25195 6.73749 6.25195 7.5425C6.25195 8.34666 6.90612 8.99999 7.71029 8.99999C8.51445 8.99999 9.16862 8.34666 9.16862 7.5425C9.16862 6.73749 8.51445 6.08333 7.71029 6.08333ZM7.71029 10.25C6.21695 10.25 5.00195 9.03583 5.00195 7.54249C5.00195 6.04833 6.21695 4.83333 7.71029 4.83333C9.20362 4.83333 10.4186 6.04833 10.4186 7.54249C10.4186 9.03583 9.20362 10.25 7.71029 10.25Z"
    />
    <mask id="mask0_2956_39128" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="17">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.833984 0.666664H14.5836V16.9167H0.833984V0.666664Z" fill="white" />
    </mask>
    <g mask="url(#mask0_2956_39128)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.70898 1.91666C4.60732 1.91666 2.08398 4.46416 2.08398 7.59416C2.08398 11.5767 6.77065 15.4567 7.70898 15.6633C8.64732 15.4558 13.334 11.5758 13.334 7.59416C13.334 4.46416 10.8107 1.91666 7.70898 1.91666ZM7.70898 16.9167C6.21398 16.9167 0.833984 12.29 0.833984 7.59416C0.833984 3.77416 3.91815 0.666664 7.70898 0.666664C11.4998 0.666664 14.584 3.77416 14.584 7.59416C14.584 12.29 9.20398 16.9167 7.70898 16.9167Z"
      />
    </g>
  </IconBase>
);

export default IconLocation;
