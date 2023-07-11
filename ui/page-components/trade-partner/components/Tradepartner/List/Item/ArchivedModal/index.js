import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ArchiveModal({ archive, setArchive, onSubmit = () => {}, archived }) {
	const { t } = useTranslation(['common', 'tradePartner']);
	return (
		<Modal
			className={styles.container}
			show={archive}
			onClose={() => setArchive(false)}
		>
			<div className={styles.icon_div}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.archive_icon}
					alt="archived_logo"
					height={70}
					width={70}
				/>
			</div>
			<div className={styles.heading}>
				{t('tradePartner:archive_modal_text_1')}
				{' '}
				{!archived ? t('tradePartner:archive_modal_text_2') : t('tradePartner:archive_modal_text_3') }
				{' '}
				{t('tradePartner:archive_modal_text_4')}
			</div>
			<div className={styles.text}>
				{t('tradePartner:archive_modal_text_5')}
				{' '}
				{!archived ? t('tradePartner:archive_modal_text_2') : t('tradePartner:archive_modal_text_3')}
				{' '}
				{t('tradePartner:archive_modal_text_6')}
			</div>
			<div className={styles.button_div}>
				<Button
					themeType="secondary"
					className={styles.secondary_button}
					onClick={() => setArchive(false)}
					type="button"
				>
					{t('tradePartner:archive_modal_button_label_2')}
				</Button>
				<Button className={styles.primary_button} onClick={onSubmit} type="button">
					{t('tradePartner:archive_modal_button_label_1')}
				</Button>
			</div>
		</Modal>
	);
}

export default ArchiveModal;
