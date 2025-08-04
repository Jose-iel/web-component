import { forwardRef, ReactNode } from 'react';
import Box from '../ui/Box';

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

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    height = 'md',
    fill = false,
    defaultValue,
    label,
    icon,
    iconRight,
    success = false,
    error,
    id,
    css,
    value,
    layout = 'default',
    disabled = false,
    spacedPlaceholder = false,
    showErrorMessage = true,
    rightIcon = false,
    iconAlwaysEnabled = false,
    autoComplete = 'off',
    onIconRightClick,
    customInput = false,
    isIconRightButton = false,
    className,
    ...rest
  } = props;

  const hasError = !!error;
  const hidden = props.type === 'hidden';
  const datePlaceholder = !customInput || (props.type === 'date' && value === '');
  const iconDisabled = !iconAlwaysEnabled && (disabled || layout === 'disabled');

  // Classes para altura
  const heightClasses = {
    sm: 'py-1.5 px-4 pl-10 max-h-8',
    md: 'py-3 px-4 pl-10 max-h-10',
    lg: 'py-2 px-2 pl-4 h-12',
  };

  // Classes para layout
  const layoutClasses = {
    default: 'bg-transparent border-gray-600',
    white: 'bg-white border-white',
    disabled: 'bg-gray-100 border-gray-400 placeholder:text-gray-400',
    chat: 'bg-white border-gray-300 placeholder:text-gray-400',
  };

  // Classes para estados
  const getInputClasses = () => {
    let classes = `
      border rounded-lg text-xs text-gray-900 transition-all duration-300
      placeholder:text-gray-600
      hover:border-gray-600 hover:bg-blue-50
      focus:border-blue-600 focus:bg-blue-50 focus:outline-none
      disabled:bg-gray-100 disabled:border-gray-400 disabled:text-gray-600 disabled:placeholder:text-gray-600
      ${heightClasses[height]}
      ${layoutClasses[layout]}
      ${fill ? 'w-full' : 'w-auto'}
      ${rightIcon ? 'pr-10 pl-4' : ''}
      ${spacedPlaceholder ? 'placeholder:tracking-widest' : ''}
      ${className || ''}
    `;

    // Para inputs customizados (PlacesInput), usar estilo limpo
    if (customInput) {
      classes = `
        w-full text-gray-700 bg-transparent border-none p-0 focus:ring-0 focus:outline-none
        placeholder:text-gray-400
        ${className || ''}
      `;
    }

    if (success && !customInput) {
      classes += ' border-green-500 hover:border-green-500';
    } else if (hasError && !customInput) {
      classes += ' border-red-500 hover:border-red-500 hover:bg-white';
    }

    return classes;
  };

  // Classes para ícones
  const getIconClasses = (isRight = false, isButton = false) => {
    let classes = `
      absolute top-0 bottom-0 flex items-center justify-center
      ${isRight ? (isButton ? 'right-2' : 'right-5') : (customInput ? 'left-0' : 'left-4')}
    `;

    if (iconDisabled) {
      classes += ' text-gray-400';
    } else if (success) {
      classes += ' text-green-500';
    } else if (hasError) {
      classes += ' text-red-500';
    } else if (isRight) {
      classes += ' text-gray-800';
    } else {
      classes += customInput ? ' text-purple-600' : ' text-blue-600';
    }

    return classes;
  };

  return (
    <Box
      className={`flex flex-col relative ${hidden ? 'hidden' : ''}`}
      css={css}
    >
      {label && (
        <span
          className={`
            ${customInput 
              ? 'text-xs text-gray-500 mb-1' 
              : 'text-sm px-4 pb-1.5 text-gray-700'
            }
            ${customInput ? 'pb-0 h-4' : ''}
            ${hasError ? 'text-red-500' : ''}
          `}
          data-testid="input-label"
        >
          {label}
        </span>
      )}
      
      <Box className="relative">
        {icon && (
          <span
            className={getIconClasses()}
            data-testid="input-icon"
          >
            <Box className="w-4 h-4 flex items-center justify-center">
              {icon}
            </Box>
          </span>
        )}
        
        <input
          id={id}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          autoComplete={autoComplete}
          className={getInputClasses()}
          style={customInput && icon ? { paddingLeft: '2rem' } : {}}
          {...rest}
          {...(props.inputRef ? { ref: props.inputRef } : { ref: ref })}
        />
        
        {iconRight && (
          <span
            className={`
              ${getIconClasses(true, isIconRightButton)}
              ${onIconRightClick ? 'cursor-pointer' : ''}
            `}
            data-testid="input-icon-right"
            onClick={onIconRightClick}
          >
            <Box className="w-4 h-4 flex items-center justify-center">
              {iconRight}
            </Box>
          </span>
        )}
      </Box>
      
      {!hidden && hasError && showErrorMessage && (
        <span
          id={`${id}-error-message`}
          className="text-xs text-red-500 pt-1 px-4 absolute -bottom-4.5"
          data-testid="form-error-message"
        >
          {error}
        </span>
      )}
    </Box>
  );
});

Input.displayName = 'Input';

export default Input;
