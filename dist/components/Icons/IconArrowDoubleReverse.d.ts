import { FC } from 'react';
import { IconProps } from './IconBase';
export interface IconArrowDoubleReverseProps extends Omit<IconProps, 'children'> {
    width?: string;
    height?: string;
    color?: string;
}
export declare const IconArrowDoubleReverse: FC<IconArrowDoubleReverseProps>;
export default IconArrowDoubleReverse;
