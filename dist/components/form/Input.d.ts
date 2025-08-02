import { ReactNode } from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    height?: 'sm' | 'md' | 'lg';
    fill?: boolean;
    label?: string;
    icon?: ReactNode;
    iconRight?: ReactNode;
    success?: boolean;
    error?: string;
    layout?: 'default' | 'white' | 'disabled' | 'chat';
    spacedPlaceholder?: boolean;
    showErrorMessage?: boolean;
    rightIcon?: boolean;
    iconAlwaysEnabled?: boolean;
    onIconRightClick?: () => void;
    customInput?: boolean;
    isIconRightButton?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    css?: React.CSSProperties;
}
export declare const Input: import('react').ForwardRefExoticComponent<InputProps & import('react').RefAttributes<HTMLInputElement>>;
export default Input;
