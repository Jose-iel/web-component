import { FC } from 'react';
import { IconBase, defaultWidth, defaultHeight, IconProps } from './IconBase';

export interface IconArrowDoubleReverseProps extends Omit<IconProps, 'children'> {
  width?: string;
  height?: string;
  color?: string;
}

export const IconArrowDoubleReverse: FC<IconArrowDoubleReverseProps> = ({ 
  width = defaultWidth, 
  height = defaultHeight, 
  color = '#3B82F6', // blue-600 como padrão
  ...rest 
}) => (
  <IconBase
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <rect
      x={width}
      y={width}
      width={width}
      height={height}
      rx="18"
      transform="rotate(-180 36 36)"
      fill={color}
    />
    <path
      d="M13.9482 14.6914C13.9482 14.4383 14.1363 14.2291 14.3804 14.196L14.4482 14.1914L23.5268 14.1914C23.8029 14.1914 24.0268 14.4153 24.0268 14.6914C24.0268 14.9445 23.8387 15.1537 23.5946 15.1868L23.5268 15.1914L14.4482 15.1914C14.1721 15.1914 13.9482 14.9675 13.9482 14.6914Z"
      fill="white"
    />
    <path
      d="M20.4434 12.3272C20.2477 12.1324 20.247 11.8159 20.4418 11.6201C20.6189 11.4422 20.8966 11.4254 21.0927 11.5702L21.1489 11.6185L23.88 14.337C24.0585 14.5147 24.0747 14.7935 23.9287 14.9896L23.88 15.0458L21.1489 17.7643C20.9532 17.9591 20.6366 17.9584 20.4418 17.7626C20.2647 17.5847 20.2492 17.3069 20.3949 17.1115L20.4434 17.0555L22.8181 14.6917L20.4434 12.3272Z"
      fill="white"
    />
    <path
      d="M12.1394 21.3103C12.1394 21.0572 12.3275 20.848 12.5716 20.8149L12.6394 20.8103L21.7179 20.8103C21.9941 20.8103 22.2179 21.0342 22.2179 21.3103C22.2179 21.5634 22.0298 21.7726 21.7858 21.8057L21.7179 21.8103L12.6394 21.8103C12.3633 21.8103 12.1394 21.5864 12.1394 21.3103Z"
      fill="white"
    />
    <path
      d="M12.2862 21.6647C12.1077 21.487 12.0915 21.2081 12.2375 21.0121L12.2862 20.9559L15.0173 18.2374C15.213 18.0426 15.5296 18.0433 15.7244 18.239C15.9015 18.417 15.917 18.6948 15.7713 18.8902L15.7228 18.9461L13.3474 21.3104L15.7228 23.6744C15.9007 23.8515 15.9175 24.1293 15.7727 24.3254L15.7244 24.3815C15.5473 24.5595 15.2696 24.5762 15.0735 24.4315L15.0173 24.3832L12.2862 21.6647Z"
      fill="white"
    />
  </IconBase>
);

export default IconArrowDoubleReverse;
