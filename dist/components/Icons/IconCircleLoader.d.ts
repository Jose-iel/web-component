import { FC } from 'react';
import { BoxProps } from '../Box';
export interface IconCircleLoaderProps extends Omit<BoxProps, 'width' | 'height'> {
    width?: string;
    height?: string;
    color?: string;
}
export declare const IconCircleLoader: FC<IconCircleLoaderProps>;
export default IconCircleLoader;
