import { DetailsHTMLAttributes, FC } from 'react';
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
export declare const Loading: FC<LoadingProps>;
export default Loading;
