import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function ArchiveModal({ archive, setArchive, refetchArchive }) {
	return (
		<Modal className={styles.modal_div} show={archive} onClose={() => setArchive(false)}>
			<div className={styles.container}>
				<div className={styles.icon_div}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/archive.svg"
						alt=""
						height={70}
						width={70}
					/>
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
