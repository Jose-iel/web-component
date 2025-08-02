import { RefObject } from 'react';
export interface UseOutsideClickProps {
    ref: RefObject<HTMLElement>;
    handler: (e: Event) => void;
}
export declare function useOutsideClick(props: UseOutsideClickProps): void;
