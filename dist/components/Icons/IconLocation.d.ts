import { FC } from 'react';
import { IconProps } from './IconBase';
export interface IconLocationProps extends Omit<IconProps, 'children'> {
    width?: string;
    height?: string;
    color?: string;
}
export declare const IconLocation: FC<IconLocationProps>;
export default IconLocation;
