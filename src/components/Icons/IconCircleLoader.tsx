import { FC } from 'react';
import Box, { BoxProps } from '../Box';

export interface IconCircleLoaderProps extends Omit<BoxProps, 'width' | 'height'> {
  width?: string;
  height?: string;
  color?: string;
}

export const IconCircleLoader: FC<IconCircleLoaderProps> = ({ 
  width = '16px', 
  height = '16px', 
  color, 
  className,
  css,
  ...rest 
}) => (
  <Box
    className={`
      border-2 border-solid rounded-full border-b-transparent
      animate-spin
      ${className || ''}
    `}
    css={{
      width: width,
      height: height,
      borderColor: color || 'currentColor',
      borderBottomColor: 'transparent',
      ...css
    }}
    data-testid="icon-circle-loader"
    {...rest}
  />
);

export default IconCircleLoader;