import styles from '~/styles/Dialog.module.scss';
import { useRef } from 'react';

export const useDialog = () => {
  const ref = useRef(null);

  const toggleOpen = (newOpen) => {
    if (newOpen) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  };

  const Component = ({ children }) => (
    <dialog
      ref={ref}
      className={styles.dialogSimple}
      onClick={() => toggleOpen(false)}
    >
      <div
        className={styles.dialogContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </dialog>
  );

  return { Dialog: Component, toggleDialog: toggleOpen };
};
