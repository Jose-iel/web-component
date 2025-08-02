import { RefObject, useCallback, useEffect, useRef } from 'react';

// Função utilitária implementada localmente
function getOwnerDocument(node?: HTMLElement | null): Document {
  return node instanceof Element ? node.ownerDocument ?? document : document;
}

function isValidEvent(event: any, ref: RefObject<HTMLElement>) {
  const target: HTMLElement = event.target;
  if (event.button > 0) return false;

  if (target) {
    const doc = getOwnerDocument(target);
    if (!doc.body.contains(target)) return false;
  }

  return !ref.current?.contains(target);
}

export interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  handler: (e: Event) => void;
}

export function useOutsideClick(props: UseOutsideClickProps): void {
  const { ref, handler } = props;
  const savedHandler = useCallback(handler, [ref, handler]);

  const stateRef = useRef({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false,
  });

  const state = stateRef.current;

  useEffect(() => {
    const onPointerDown: any = (e: PointerEvent) => {
      if (isValidEvent(e, ref)) {
        state.isPointerDown = true;
      }
    };

    const onMouseUp: any = (event: MouseEvent) => {
      if (state.ignoreEmulatedMouseEvents) {
        state.ignoreEmulatedMouseEvents = false;
        return;
      }

      if (state.isPointerDown && isValidEvent(event, ref)) {
        state.isPointerDown = false;
        savedHandler(event);
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      state.ignoreEmulatedMouseEvents = true;
      if (state.isPointerDown && isValidEvent(event, ref)) {
        state.isPointerDown = false;
        savedHandler(event);
      }
    };

    const doc = getOwnerDocument(ref.current);
    doc.addEventListener('mousedown', onPointerDown, true);
    doc.addEventListener('mouseup', onMouseUp, true);
    doc.addEventListener('touchstart', onPointerDown, true);
    doc.addEventListener('touchend', onTouchEnd, true);

    return () => {
      doc.removeEventListener('mousedown', onPointerDown, true);
      doc.removeEventListener('mouseup', onMouseUp, true);
      doc.removeEventListener('touchstart', onPointerDown, true);
      doc.removeEventListener('touchend', onTouchEnd, true);
    };
  }, [handler, ref, savedHandler, state]);
}
