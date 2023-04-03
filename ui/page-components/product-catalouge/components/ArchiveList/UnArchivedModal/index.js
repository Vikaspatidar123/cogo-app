import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function UnArchiveModal({ archive, setArchive, refetchArchive }) {
	return (
		<Modal className={styles.container} show={archive} onClose={() => setArchive(false)}>
			<div className={styles.icon_div}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/archive.svg"
					alt=""
					height={70}
					width={70}
				/>
			</div>
			<div className={styles.heading}>Are you sure you want to UnArchive this product?</div>
			<div className={styles.text}>
				You can retrive your Unarchived product anytime from the All Categories tab
			</div>
			<div className={styles.button_div}>
				<Button
					themeType="secondary"
					className={styles.secondary_button}
					onClick={() => setArchive(false)}
				>
					No

				</Button>
				<Button className={styles.primary_button} onClick={() => refetchArchive()}>Yes</Button>
			</div>
		</Modal>
	);
}

export default UnArchiveModal;
