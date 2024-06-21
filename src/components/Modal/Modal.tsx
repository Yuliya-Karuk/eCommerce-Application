import { useClickOutside } from '@hooks/useClickOutside';
import { useLockScroll } from '@hooks/useLockScroll';
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

  useClickOutside(modalRef, onClose);
  useLockScroll(isOpenModal);

  useEffect(() => {
    if (isOpenModal) {
      document.body.append(modalRoot);
    }

    return () => {
      if (isOpenModal) {
        modalRoot.remove();
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
