import { Button, Modal } from '@cogoport/components';
import React from 'react';

import Archive from '../../../assets/archive.svg';

// import {
// 	IconDiv,
// 	Heading,
// 	Text,
// 	ButtonDiv,
// 	SecondaryButton,
// 	PrimaryButton,
// 	Container,
// } from './styles';
import styles from './styles.module.css';

function UnArchiveModal({ archive, setArchive, refetchArchive }) {
	return (
		<Modal className={styles.container} show={archive} onClose={() => setArchive(false)}>
			<div className={styles.icon_div}>
				<Archive height={50} width={40} marginBottom={8} />
			</div>
			<div className={styles.heading}>Are you sure you want to UnArchive this product?</div>
			<div className={styles.text}>
				You can retrive your Unarchived product anytime from the All Categories tab
			</div>
			<div className={styles.button_div}>
				<Button className={styles.secondary_button} onClick={() => setArchive(false)}>No</Button>
				<Button className={styles.primary_button} onClick={() => refetchArchive()}>Yes</Button>
			</div>
		</Modal>
	);
}

export default UnArchiveModal;
