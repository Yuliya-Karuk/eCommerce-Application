import { useCallback, useEffect, useMemo } from 'react';

export const useLockScroll = (useLock: boolean) => {
  const keyboardLockedCodes = useMemo(() => ['ArrowUp', 'ArrowDown'], []);

  const scrollLockHandler = useCallback((e: Event) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const touchLockHandler = useCallback((e: TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const scrollKeyLockHandler = useCallback(
    (e: KeyboardEvent) => {
      e.stopPropagation();

      if (keyboardLockedCodes.includes(e.code)) {
        e.preventDefault();
      }
    },
    [keyboardLockedCodes]
  );

  useEffect(() => {
    if (useLock) {
      document.body.addEventListener('wheel', scrollLockHandler, { passive: false });
      document.body.addEventListener('keydown', scrollKeyLockHandler);
      document.body.addEventListener('touchmove', touchLockHandler, { passive: false });
    } else {
      document.body.removeEventListener('wheel', scrollLockHandler);
      document.body.removeEventListener('keydown', scrollKeyLockHandler);
      document.body.removeEventListener('touchmove', touchLockHandler);
    }
  });
};
