import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ArchiveModal({ archive, setArchive, onSubmit = () => {}, archived }) {
	return (
		<Modal
			className={styles.container}
			show={archive}
			onClose={() => setArchive(false)}
		>
			<div className={styles.icon_div}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/archive.svg"
					alt=""
					height={70}
					width={70}
				/>
			</div>
			<div className={styles.heading}>
				Are you sure you want to
				{' '}
				{!archived ? 'Archive' : 'Unarchive'}
				{' '}
				this
				trade partners?
			</div>
			<div className={styles.text}>
				You can retrive your
				{' '}
				{!archived ? 'Archive' : 'Unarchive'}
				{' '}
				product
				anytime from the All Trade Partners
			</div>
			<div className={styles.button_div}>
				<Button
					themeType="secondary"
					className={styles.secondary_button}
					onClick={() => setArchive(false)}
				>
					No
				</Button>
				<Button className={styles.primary_button} onClick={() => onSubmit()}>
					Yes
				</Button>
			</div>
		</Modal>
	);
}

export default ArchiveModal;
