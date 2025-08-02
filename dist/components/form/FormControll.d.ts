import { FC, HTMLAttributes, ReactNode } from 'react';
export type FormControlProps = HTMLAttributes<HTMLDivElement> & {
    css?: React.CSSProperties;
    children?: ReactNode;
};
export declare const FormControl: FC<FormControlProps>;
export default FormControl;
