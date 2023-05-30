import UploadDocument from '../UploadDocument';

import styles from './styles.module.css';

function Heading() {
	return (
		<div className={styles.header}>
			<div className={styles.title}>Quick Upload a Document</div>
			<UploadDocument />
		</div>
	);
}

export default Heading;
