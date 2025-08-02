import { RefObject } from 'react';

const scrollTop = (ref: RefObject<HTMLElement>, offsetTop = 0): void => {
  if (window) {
    const position = ref.current ? ref.current.getBoundingClientRect() : { top: 0 };
    window.scrollTo({ top: position.top + window.pageYOffset - offsetTop, behavior: 'smooth' });
  }
};

export { scrollTop };