import { FC } from 'react';
import { IconBase, defaultWidth, defaultHeight, IconProps } from './IconBase';

export interface IconSendProps extends Omit<IconProps, 'children'> {
  width?: string;
  height?: string;
  color?: string;
}

export const IconSend: FC<IconSendProps> = ({ 
  width = defaultWidth, 
  height = defaultHeight, 
  color = 'currentColor', 
  ...rest 
}) => (
  <IconBase
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8049 14.8178L14.4619 20.7508C14.6219 21.0108 14.8719 21.0078 14.9729 20.9938C15.0739 20.9798 15.3169 20.9178 15.4049 20.6228L19.9779 5.17783C20.0579 4.90483 19.9109 4.71883 19.8449 4.65283C19.7809 4.58683 19.5979 4.44583 19.3329 4.52083L3.87695 9.04683C3.58394 9.13283 3.51994 9.37883 3.50594 9.47983C3.49194 9.58283 3.48794 9.83783 3.74695 10.0008L9.74794 13.7538L15.0499 8.39583C15.3409 8.10183 15.8159 8.09883 16.1109 8.38983C16.4059 8.68083 16.4079 9.15683 16.1169 9.45083L10.8049 14.8178ZM14.8949 22.4998C14.1989 22.4998 13.5609 22.1458 13.1849 21.5378L9.30794 15.2468L2.95194 11.2718C2.26694 10.8428 1.90894 10.0788 2.01994 9.27583C2.12994 8.47283 2.68094 7.83483 3.45494 7.60783L18.9109 3.08183C19.6219 2.87383 20.3839 3.07083 20.9079 3.59283C21.4319 4.11983 21.6269 4.88983 21.4149 5.60383L16.8419 21.0478C16.6129 21.8248 15.9729 22.3738 15.1719 22.4808C15.0779 22.4928 14.9869 22.4998 14.8949 22.4998Z"
    />
  </IconBase>
);

export default IconSend;
