import styles from './styles.module.css';

function ErrorMessage({ message }) {
	return <div className={styles.container}>{message || ''}</div>;
}

export default ErrorMessage;
