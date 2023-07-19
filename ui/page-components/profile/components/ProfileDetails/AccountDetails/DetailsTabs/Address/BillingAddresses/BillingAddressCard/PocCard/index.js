import { IcMEdit } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function PocCard({ firstPoc = {}, setPocToUpdate = () => {}, setShowPocModal = () => {} }) {
	const { t } = useTranslation(['settings']);

	return (
		<div className={styles.poc_container}>
			<div
				className={styles.poc_edit_icon_container}
				onClick={() => {
					setShowPocModal('edit');
					setPocToUpdate(firstPoc);
				}}
				role="presentation"
			>
				<IcMEdit style={{ width: 12, height: 12 }} />
			</div>

			<div className={styles.poc_sub_container}>
				<div className={`${styles.value_text}${styles.poc_details}`}>
					{t('settings:poc_name_label')}
				</div>
				<div className={`${styles.label_text}${styles.poc_details}`}>
					{firstPoc?.name || '-'}
				</div>
			</div>

			<div className={styles.poc_sub_container}>
				<div className={`${styles.value_text}${styles.poc_details}`}>
					{t('settings:poc_mobile_label')}
				</div>
				<div className={`${styles.label_text}${styles.poc_details}`}>
					{firstPoc?.mobile_number
						? `${firstPoc?.mobile_country_code || ''} ${
							firstPoc?.mobile_number
						}`
						: '-'}
				</div>
			</div>

			<div className={styles.poc_sub_container}>
				<div className={`${styles.value_text}${styles.poc_details}`}>
					{t('settings:poc_email_label')}
					{' '}
				</div>
				<div className={`${styles.label_text}${styles.poc_details}`}>
					{firstPoc?.email || '-'}
				</div>
			</div>

			<div className={styles.poc_sub_container}>
				<div className={`${styles.value_text}${styles.poc_details}`}>
					{t('settings:poc_alternate_mobile_label')}
				</div>
				<div className={`${styles.label_text}${styles.poc_details}`}>
					{firstPoc?.alternate_mobile_number
						? `${firstPoc?.alternate_mobile_country_code || ''} ${
							firstPoc?.alternate_mobile_number
						}`
						: '-'}
				</div>
			</div>
		</div>
	);
}

export default PocCard;
