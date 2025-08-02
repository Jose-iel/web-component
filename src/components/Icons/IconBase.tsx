import { FC, SVGProps, ReactNode } from 'react';

export const defaultWidth = '1.1em';
export const defaultHeight = '1.1em';

export interface IconProps extends SVGProps<SVGSVGElement> {
  children?: ReactNode;
  css?: React.CSSProperties;
}

export const IconBase: FC<IconProps> = ({ 
  children, 
  width = defaultWidth,
  height = defaultHeight,
  className,
  css,
  style,
  ...props 
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={`inline-flex ${className || ''}`}
    style={{ ...css, ...style }}
    {...props}
  >
    {children}
  </svg>
);

IconBase.displayName = 'IconBase';

export default IconBase;