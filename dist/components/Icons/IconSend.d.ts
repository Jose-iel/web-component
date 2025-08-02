import { FC } from 'react';
import { IconProps } from './IconBase';
export interface IconSendProps extends Omit<IconProps, 'children'> {
    width?: string;
    height?: string;
    color?: string;
}
export declare const IconSend: FC<IconSendProps>;
export default IconSend;
