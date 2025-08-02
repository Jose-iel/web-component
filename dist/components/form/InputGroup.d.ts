import { FC, HTMLAttributes } from 'react';
export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    variant?: string;
    css?: React.CSSProperties;
}
export declare const InputGroup: FC<InputGroupProps>;
export default InputGroup;
