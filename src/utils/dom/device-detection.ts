import { Dict } from '../../types';

export const isBrowser = (): boolean => typeof window !== 'undefined';

export const isMobile = (context: Dict): boolean => {
  // Verifica user-agent nos headers (servidor)
  if (context?.headers?.['user-agent']) {
    return /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i.test(context.headers['user-agent']);
  }

  // Verifica touch support no DOM (cliente)
  if (context?.documentElement) {
    return 'ontouchstart' in context.documentElement;
  }

  // Default para mobile se não conseguir detectar
  return true;
};

export const getPopupSize = (): string => {
  const dualScreenLeft = window.screenLeft ?? (screen as any)?.left ?? 0;
  const dualScreenTop = window.screenTop ?? (screen as any)?.top ?? 0;

  const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
  const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

  const popupWidth = 440;
  const popupHeight = 600;
  
  const left = Math.round(width / 2 - popupWidth / 2 + dualScreenLeft);
  const top = Math.round(height / 2 - popupHeight / 2 + dualScreenTop);

  return `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`;
};
