import { FC, SVGProps, ReactNode } from 'react';
export declare const defaultWidth = "1.1em";
export declare const defaultHeight = "1.1em";
export interface IconProps extends SVGProps<SVGSVGElement> {
    children?: ReactNode;
    css?: React.CSSProperties;
}
export declare const IconBase: FC<IconProps>;
export default IconBase;
