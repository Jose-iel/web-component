import { cloneElement, FC, HTMLAttributes, ReactElement, ReactNode, Children, isValidElement, JSXElementConstructor } from 'react';
import Box from '../ui/Box';

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

// Função helper para obter children válidos (implementação original)
function getValidChildren(children: ReactNode): ReactElement<any, string | JSXElementConstructor<any>>[] {
  return Children.toArray(children).filter((child: any) => isValidElement(child)) as ReactElement[];
}

export const RadioGroup: FC<RadioGroupProps> = (props: RadioGroupProps) => {
  const { 
    children, 
    size = 'md', 
    direction = 'row', 
    value, 
    defaultValue, 
    name, 
    onChange: onChangeProp,
    css,
    className,
    ...rest 
  } = props;
  
  const validChildren = getValidChildren(children);
  let first = true;

  // Mapeamento de direções para classes Tailwind
  const directionClasses = {
    'row': 'flex-row',
    'row-reverse': 'flex-row-reverse', 
    'column': 'flex-col',
    'column-reverse': 'flex-col-reverse'
  };

  const clones = validChildren.map((child: ReactElement, index: number) => {
    const childType = child.type as any;
    const childName = childType?.displayName || childType?.name;
    const childProps = child.props as any;
    
    const defaultChecked = childProps?.value === value || childProps?.value === defaultValue;
    
    const theming = {
      onChange: () => onChangeProp(childProps?.value),
      name,
      id: `${name}-${index}`,
      defaultChecked,
      size: childProps?.size || size,
      // Aplica margin apenas para Radio em direção row (exceto o primeiro)
      ...(childName === 'Radio' && !first && direction.includes('row') 
        ? { className: `ml-6 ${childProps?.className || ''}` } 
        : {}),
    };
    first = false;

    return childName !== 'Radio' 
      ? cloneElement(child, theming) 
      : cloneElement(child, { ...theming, ...childProps });
  });

  return (
    <Box
      className={`
        flex items-start justify-start
        ${directionClasses[direction]}
        ${className || ''}
      `}
      css={css}
      {...rest}
    >
      {clones}
    </Box>
  );
};

export default RadioGroup;
