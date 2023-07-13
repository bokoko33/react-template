import styles from '~/App.module.scss';
import { useDialog } from '~/hooks/useDialog';

function App() {
  const { Dialog, toggleDialog } = useDialog();

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={() => toggleDialog(true)}>
        simple dialog
      </button>
      <Dialog>Dialog</Dialog>
    </div>
  );
}

export default App;
