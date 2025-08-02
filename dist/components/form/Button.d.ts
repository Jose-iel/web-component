import { ButtonHTMLAttributes, ReactElement } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'black' | 'white' | 'gray' | 'error';
export type ButtonSizes = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSizes;
    css?: React.CSSProperties;
    fill?: boolean;
    icon?: ReactElement;
    as?: 'button' | 'a' | 'span';
    href?: string;
    target?: string;
    hide?: boolean;
};
export declare const Button: import('react').ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSizes;
    css?: React.CSSProperties;
    fill?: boolean;
    icon?: ReactElement;
    as?: "button" | "a" | "span";
    href?: string;
    target?: string;
    hide?: boolean;
} & import('react').RefAttributes<HTMLButtonElement>>;
export default Button;
