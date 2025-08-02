import { cloneElement, FC, HTMLAttributes, ReactElement, isValidElement, Children } from 'react';
import Box from '../ui/Box';

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: string;
  css?: React.CSSProperties;
}

// Função utilitária para obter children válidos
const getValidChildren = (children: React.ReactNode): ReactElement[] => {
  return Children.toArray(children).filter((child) =>
    isValidElement(child)
  ) as ReactElement[];
};

export const InputGroup: FC<InputGroupProps> = (props: InputGroupProps) => {
  const { children, size, variant, className, css, ...rest } = props;
  const validChildren = getValidChildren(children);

  const clones = validChildren.map((child: ReactElement, index: number) => {
    // Verificação de tipo mais segura
    const childType = child.type as any;
    const name = (typeof childType === 'function' ? childType.displayName || childType.name : '') || '';
    
    // Props com verificação de tipo
    const childProps = child.props as any;
    const childSize = childProps?.size || size;
    
    const theming = {
      size: childSize,
      variant: childProps?.variant || variant,
      fontSize: childProps?.fontSize || childSize,
      height: childSize,
      width: childSize,
    };

    const clonedProps = name !== 'Input' 
      ? { ...theming, key: index }
      : { ...theming, ...childProps, key: index };

    return cloneElement(child, clonedProps);
  });

  return (
    <Box 
      className={`block w-full ${className || ''}`}
      css={css}
      {...rest}
    >
      {clones}
    </Box>
  );
};

export default InputGroup;
