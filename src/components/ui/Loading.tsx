import { DetailsHTMLAttributes, FC } from 'react';
import Box from './Box';
import Spinner from './Spinner';

interface LoadingProps extends DetailsHTMLAttributes<HTMLDivElement> {
  onClose?(visible: boolean): void;
  visible: boolean;
  title?: string;
  onlyLoader?: boolean;
  colorBg?: string;
  zIndex?: number;
  className?: string;
  css?: React.CSSProperties;
}

export const Loading: FC<LoadingProps> = ({
  onClose,
  title,
  visible,
  onlyLoader = false,
  colorBg = 'rgba(255, 255, 255, 0.7)',
  zIndex = 100,
  className,
  css,
  ...props
}: LoadingProps) => {
  if (!visible) {
    return null;
  }

  return (
    <Box
      className={`
        fixed left-0 top-0 w-full h-full
        flex justify-center items-center
        transition-all duration-400 ease-in-out
        ${className || ''}
      `}
      css={{
        backgroundColor: colorBg,
        zIndex: zIndex,
        ...css
      }}
      data-testid="loading-background"
      onClick={() => onClose && onClose(!visible)}
      {...props}
    >
      <Box
        className={`
          flex justify-center items-center flex-col p-4 rounded
          ${onlyLoader ? 'bg-transparent shadow-none' : 'bg-white/90 shadow-md'}
          w-[70%] md:w-[30%]
        `}
      >
        <Spinner />

        {title && !onlyLoader ? (
          <Box 
            className="w-full mt-4 text-sm md:text-base text-center" 
            data-testid="loading-title"
          >
            {title}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

Loading.displayName = 'Loading';

export default Loading;
