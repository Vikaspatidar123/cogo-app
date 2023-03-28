import styles from './styles.module.css';

function Message({ text, classname }) {
	return <p className={`${styles?.[classname]} ${styles.text}`}>{text}</p>;
}

export default Message;
