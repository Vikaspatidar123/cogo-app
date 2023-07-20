import { cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function PocSubContainer({ value, label }) {
	return (
		<div className={styles.poc_sub_container}>
			<div className={cl`${styles.value_text} ${styles.poc_details}`}>
				{label}
			</div>
			<div className={cl`${styles.label_text} ${styles.poc_details}`}>
				{value}
			</div>
		</div>
	);
}

function PocCard({ firstPoc = {}, setPocToUpdate = () => {}, setShowPocModal = () => {} }) {
	const { t } = useTranslation(['settings']);

	const handleClick = () => {
		setShowPocModal('edit');
		setPocToUpdate(firstPoc);
	};

	return (
		<div className={styles.poc_container}>
			<div
				className={styles.poc_edit_icon_container}
				onClick={handleClick}
				role="presentation"
			>
				<IcMEdit style={{ width: 12, height: 12 }} />
			</div>

			<PocSubContainer label={t('settings:poc_name_label')} value={firstPoc?.name || '-'} />

			<PocSubContainer
				label={t('settings:poc_mobile_label')}
				value={firstPoc?.mobile_number
					? `${firstPoc?.mobile_country_code || ''} ${
						firstPoc?.mobile_number
					}`
					: '-'}
			/>

			<PocSubContainer label={t('settings:poc_email_label')} value={firstPoc?.email || '-'} />

			<PocSubContainer
				label={t('settings:poc_alternate_mobile_label')}
				value={firstPoc?.alternate_mobile_number
					? `${firstPoc?.alternate_mobile_country_code || ''} ${
						firstPoc?.alternate_mobile_number
					}`
					: '-'}
			/>
		</div>
	);
}

export default PocCard;
