import { ButtonHTMLAttributes, FC, ReactElement, forwardRef } from 'react';

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

// Mapeamento de variantes para classes Tailwind
const variantClasses = {
  primary: `
    bg-blue-600 text-white
    hover:bg-blue-700
    active:bg-blue-800
    disabled:bg-gray-100 disabled:text-gray-400
  `,
  secondary: `
    border border-blue-600 bg-transparent text-blue-600
    hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700
    active:border-blue-700 active:bg-blue-100 active:text-blue-700
    disabled:bg-transparent disabled:border-gray-400 disabled:text-gray-400
  `,
  tertiary: `
    bg-transparent text-blue-600
    hover:text-blue-700
    active:text-blue-800
    disabled:text-gray-400
  `,
  black: `
    bg-gray-900 text-white
    hover:bg-gray-600
    active:bg-gray-700
    disabled:bg-gray-100 disabled:text-gray-400
  `,
  white: `
    bg-white text-gray-900
    hover:bg-gray-600
    active:bg-gray-700
    disabled:bg-gray-100 disabled:text-gray-400
  `,
  gray: `
    bg-gray-300 text-gray-900
    hover:bg-gray-400
    active:bg-gray-400
    disabled:bg-gray-100 disabled:text-gray-400
  `,
  error: `
    bg-red-600 text-white
    hover:bg-red-700
    active:bg-red-800
    disabled:bg-gray-100 disabled:text-gray-400
  `,
};

// Mapeamento de tamanhos para classes Tailwind
const sizeClasses = {
  sm: 'px-4 py-1.5',
  md: 'px-4 py-2.5',
  lg: 'px-4 py-3.5',
  xl: 'px-12 py-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    size = 'md',
    type = 'button',
    variant = 'primary',
    css,
    fill = false,
    hide,
    className,
    children,
    as = 'button',
    ...props
  }, ref) => {
    if (hide) return null;

    const Component = as as any;

    // Classes base do botão
    const baseClasses = `
      flex flex-row items-center justify-center
      rounded-full text-xs
      disabled:pointer-events-none
      transition-colors duration-150
    `;

    // Classes condicionais
    const fillClasses = fill ? 'w-full' : 'w-max';
    const variantClass = variantClasses[variant] || variantClasses.primary;
    const sizeClass = sizeClasses[size] || sizeClasses.md;

    // Combina todas as classes
    const finalClassName = [
      baseClasses,
      variantClass,
      sizeClass,
      fillClasses,
      className
    ].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();

    return (
      <Component
        ref={ref}
        type={type}
        className={finalClassName}
        style={css}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;