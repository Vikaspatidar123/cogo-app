import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function Footer({ sellerDetails = {} }) {
	const {
		taxNumber,
		pocPhoneCode,
		pocPhoneNumber,
		pocEmail,
	} = sellerDetails;
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{pocPhoneNumber && <div className={styles.col}>{`${pocPhoneCode} ${pocPhoneNumber}`}</div>}
				{pocEmail && <div className={styles.col}>{pocEmail}</div>}
				{taxNumber && <div className={cl`${styles.col} ${styles.last_child}`}>{taxNumber}</div>}
			</div>
		</div>
	);
}

export default Footer;
