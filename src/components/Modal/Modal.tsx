import { useClickOutside } from '@hooks/useClickOutside';
import { useGetScrollWidth } from '@hooks/useGetScrollWidth';
import { useIsMobile } from '@hooks/useIsMobile';
import { FC, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface IModalProps {
  isOpenModal: boolean;
  onClose: () => void;
}

export const Modal: FC<React.PropsWithChildren & IModalProps> = ({ isOpenModal, onClose, children }) => {
  const modalRef = useRef(null);
  const modalRoot = useMemo(() => {
    const element = document.createElement('div');

    element.classList.add(styles.modal);
    return element;
  }, []);
  const scrollWidth = useGetScrollWidth();
  const isMobile = useIsMobile();
  const addedClasses = isMobile ? ['lock'] : ['lock', 'csw'];

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    document.documentElement.style.setProperty('--scroll-width', `${scrollWidth}px`);
    document.documentElement.classList.toggle('mobile', isMobile);

    if (isOpenModal) {
      document.body.append(modalRoot);
      document.body.classList.add(...addedClasses);
    }

    return () => {
      if (isOpenModal) {
        modalRoot.remove();
        document.body.classList.remove(...addedClasses);
      }
    };
  });

  if (isOpenModal) {
    return createPortal(
      <div className={styles.modalBody} ref={modalRef}>
        {children}
      </div>,
      modalRoot
    );
  }

  return null;
};
