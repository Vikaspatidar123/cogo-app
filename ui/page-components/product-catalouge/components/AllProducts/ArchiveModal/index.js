import { Button, Modal } from '@cogoport/components';

import Archive from '../../../assets/archive.svg';

import styles from './styles.module.css';

function ArchiveModal({ archive, setArchive, refetchArchive }) {
	return (
		<Modal className={styles.modal_div} show={archive} onClose={() => setArchive(false)}>
			<div className={styles.container}>
				<div className={styles.icon_div}>
					<Archive height={50} width={40} marginBottom={8} />
				</div>
				<div className={styles.heading}>Are you sure you want to archive this product?</div>
				<div className={styles.text}>You can retrive your archived product anytime from the archived tab</div>
			</div>
			<div className={styles.button_div}>
				<Button className={styles.secondary_button} onClick={() => setArchive(false)}>No</Button>
				<Button
					className={styles.primary_button}
					onClick={() => {
						refetchArchive();
					}}
				>
					Yes
				</Button>
			</div>
		</Modal>
	);
}

export default ArchiveModal;
