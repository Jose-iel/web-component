import { default as React } from 'react';
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: keyof React.JSX.IntrinsicElements;
    css?: React.CSSProperties;
    children?: React.ReactNode;
}
export declare const Box: React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLDivElement>>;
export default Box;
