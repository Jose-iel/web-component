import { FC, HTMLAttributes, ReactNode } from 'react';
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadioGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'defaultValue'> & {
    name: string;
    onChange: (value?: string | number | boolean) => void;
    value?: string | number | boolean;
    defaultValue?: string | number | boolean;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    size?: RadioSize;
    children?: ReactNode;
    css?: React.CSSProperties;
};
export declare const RadioGroup: FC<RadioGroupProps>;
export default RadioGroup;
