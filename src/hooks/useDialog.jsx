import styles from '~/styles/Dialog.module.scss';
import { useCallback, useRef } from 'react';

export const useDialog = () => {
  const ref = useRef(null);

  const toggleOpen = useCallback((newOpen) => {
    const dialogEl = ref.current;
    if (newOpen) {
      // show()だとフォーカス制御やescで閉じられない
      dialogEl.showModal();

      // state更新だと再描画でdialogの開閉が合わなくなる
      dialogEl.dataset.state = 'opening';
    } else {
      dialogEl.dataset.state = 'closing';
      dialogEl.onanimationend = () => {
        dialogEl.close();
        dialogEl.onanimationend = null;
      };
    }
  }, []);

  const Component = ({ children }) => (
    <dialog
      ref={ref}
      className={styles.root}
      onClick={() => {
        // backdropクリックで閉じたい
        toggleOpen(false);
      }}
    >
      <div
        className={styles.content}
        onClick={(e) => {
          // backdropのみのクリックは判定できないので、
          // content側の伝番を防ぐことで中身は触れるようにする
          e.stopPropagation();
        }}
      >
        <button
          className={styles.close}
          onClick={() => toggleOpen(false)}
        ></button>
        <div className={styles.inner}>{children}</div>
      </div>
    </dialog>
  );

  return { Dialog: Component, toggleDialog: toggleOpen };
};
