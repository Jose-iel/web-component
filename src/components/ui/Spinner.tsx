import { DetailsHTMLAttributes, FC } from 'react';
import Box from './Box';

interface SpinProps extends DetailsHTMLAttributes<HTMLDivElement> {
  size?: string | string[];
  customSpin?: boolean;
  className?: string;
  css?: React.CSSProperties;
}

const getCalculatedLeftValue = (size: string) => `calc(50% - ${size} / 2)`;

export const Spin: FC<SpinProps> = ({ 
  size, 
  customSpin = false, 
  className,
  css,
  ...rest 
}) => {
  const computedSize = size || ['64px', '72px'];
  const beforeLeftValue = Array.isArray(size) || !size
    ? Array.isArray(computedSize) 
      ? [getCalculatedLeftValue(computedSize[0]), getCalculatedLeftValue(computedSize[1])]
      : getCalculatedLeftValue(computedSize)
    : getCalculatedLeftValue(size);

  return (
    <Box
      className={`
        relative
        ${className || ''}
      `}
      css={{
        width: Array.isArray(computedSize) ? computedSize[0] : computedSize,
        aspectRatio: '1 / 1',
        ...css
      }}
      data-testid="spin"
      {...rest}
    >
      {/* Pseudo-elemento before implementado como elemento real */}
      <Box
        className={`
          absolute animate-spin
          border-3 border-transparent border-b-blue-600 border-r-blue-600 border-l-blue-600
          rounded-full
        `}
        css={{
          width: Array.isArray(computedSize) ? computedSize[0] : computedSize,
          aspectRatio: '1 / 1',
          left: customSpin ? 'auto' : (Array.isArray(beforeLeftValue) ? beforeLeftValue[0] : beforeLeftValue),
          willChange: 'transform',
        }}
      />
    </Box>
  );
};

Spin.displayName = 'Spin';

export default Spin;
