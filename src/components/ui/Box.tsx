import React, { forwardRef } from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof React.JSX.IntrinsicElements;
  css?: React.CSSProperties; // Mantém para casos específicos
  children?: React.ReactNode;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ as = 'div', css, style, className, children, ...props }, ref) => {
    const Component = as as any;
    
    // Combina css prop com style prop (style tem prioridade)
    const finalStyle = { ...css, ...style };
    
    return (
      <Component ref={ref} className={className} style={finalStyle} {...props}>
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';

export default Box;
