import { Modal } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SuccessModal({ show, setShow, title, description, cta = 'Okay' }) {
	const handleClose = () => {
		setShow(false);
	};

	return (
		<Modal show={show} onClose={handleClose} closable={false}>
			<div className={styles.container}>
				<IcCFtick width="60px" height="60px" />
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{description}</div>
				<div className={styles.submit} role="presentation" onClick={handleClose}>{cta}</div>
			</div>
		</Modal>
	);
}

export default SuccessModal;
