import { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from 'react';
import Box from '../ui/Box';

export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'size'> & {
  value?: string | number | boolean;
  size?: RadioSize;
  children?: ReactNode;
  css?: React.CSSProperties;
};

export const Radio: FC<RadioProps> = ({
  children,
  id,
  name,
  value = true,
  size = 'md',
  css,
  className,
  ...props
}: RadioProps) => {
  if (!id && !name) return null;
  
  const isChecked = props.defaultChecked || props.checked;
  
  console.log('Radio render:', { id, value, isChecked, defaultChecked: props.defaultChecked, checked: props.checked });
  
  // Mapeamento de tamanhos para classes Tailwind
  const sizeClasses: Record<RadioSize, { wrapper: string; inner: string; hover: string }> = {
    xs: { wrapper: 'w-3 h-3', inner: 'w-1.5 h-1.5', hover: 'w-6 h-6' },
    sm: { wrapper: 'w-3 h-3', inner: 'w-1.5 h-1.5', hover: 'w-6 h-6' },
    md: { wrapper: 'w-4 h-4', inner: 'w-3 h-3', hover: 'w-8 h-8' },
    lg: { wrapper: 'w-5 h-5', inner: 'w-3 h-3', hover: 'w-10 h-10' },
    xl: { wrapper: 'w-5 h-5', inner: 'w-2 h-2', hover: 'w-10 h-10' },
  };

  const currentSize = sizeClasses[size];

  return (
    <Box
      as="label"
      className={`inline-flex items-center justify-start cursor-pointer ${className || ''}`}
      css={css}
      data-testid={id || name}
      tabIndex={props.tabIndex}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (props.onChange && e.keyCode === 32) {
          e.preventDefault();
          props.onChange(value as any);
        }
      }}
      {...({ htmlFor: id || name } as any)}
    >
      <input 
        type="radio" 
        id={id} 
        name={name} 
        value={typeof value === 'boolean' ? String(value) : value}
        className="sr-only"
        {...props} 
      />
      
      <Box 
        className={`
          relative inline-flex items-center w-full
          ${props.disabled ? 'text-gray-400' : 'text-gray-900'}
        `}
      >
        {/* RadioBefore - Container principal */}
        <Box 
          className={`
            flex relative rounded-full bg-white items-center justify-center mr-2
            w-5 h-5
            ${isChecked 
              ? (props.disabled ? 'border-gray-400' : 'border-purple-500') 
              : 'border-gray-300'}
            border-2 cursor-pointer transition-all duration-200 ease-in-out
            ${!props.disabled ? 'hover:shadow-purple-300 focus:shadow-purple-300' : ''}
          `}
        >
          {/* RadioAfter - Círculo interno */}
          <Box
            className={`
              absolute inline-flex rounded-full z-[4] 
              w-3 h-3
              transform -translate-x-1/2 -translate-y-1/2
              left-1/2 top-1/2 transition-all duration-200 ease-in-out
              ${isChecked 
                ? (props.disabled ? 'bg-gray-400' : 'bg-purple-500') 
                : 'bg-transparent'}
            `}
          />
        </Box>
        {children && (
          <span className="text-gray-700 font-medium">{children}</span>
        )}
      </Box>
    </Box>
  );
};

Radio.displayName = 'Radio';

export default Radio;
