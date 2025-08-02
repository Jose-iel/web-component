import { DetailsHTMLAttributes, FC } from 'react';
interface SpinProps extends DetailsHTMLAttributes<HTMLDivElement> {
    size?: string | string[];
    customSpin?: boolean;
    className?: string;
    css?: React.CSSProperties;
}
export declare const Spin: FC<SpinProps>;
export default Spin;
