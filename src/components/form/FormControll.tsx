import { FC, HTMLAttributes, ReactNode } from 'react';
import Box from '../ui/Box';

export type FormControlProps = HTMLAttributes<HTMLDivElement> & {
  css?: React.CSSProperties;
  children?: ReactNode;
};

export const FormControl: FC<FormControlProps> = ({ css, children, className, ...props }: FormControlProps) => (
  <Box 
    className={`mb-4 ${className || ''}`}
    css={css}
    {...props}
  >
    {children}
  </Box>
);

FormControl.displayName = 'FormControl';

export default FormControl;
