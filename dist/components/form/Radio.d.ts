import { FC, InputHTMLAttributes, ReactNode } from 'react';
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'size'> & {
    value?: string | number | boolean;
    size?: RadioSize;
    children?: ReactNode;
    css?: React.CSSProperties;
};
export declare const Radio: FC<RadioProps>;
export default Radio;
