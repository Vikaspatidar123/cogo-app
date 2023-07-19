import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';

function ContactDetails() {
	const { t } = useTranslation(['settings']);
	const { profile = {} } = useSelector((state) => state);
	const geo = getGeoConstants();
	const showWhatsapp = geo.others.navigations.profile_details.show_whatsapp;

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.label_text}>{t('settings:settings_mobile_number_label')}</div>
				<div className={styles.value_text}>
					{profile.mobile_number
						? `${profile.mobile_country_code
						} ${profile.mobile_number}`
						: '-'}
				</div>
			</div>

			{showWhatsapp && (
				<div className={styles.sub_container}>
					<div className={styles.label_text}>{t('settings:settings_whatsapp_number_label')}</div>
					<div className={styles.value_text}>
						{profile.whatsapp_number
							? `${profile.whatsapp_country_code
							} ${profile.whatsapp_number}`
							: '-'}
					</div>
				</div>
			)}

			<div className={`${styles.sub_container}${styles.last_item}`}>
				<div className={styles.label_text}>{t('settings:settings_email_label')}</div>
				<div className={styles.value_text}>{profile.email}</div>
			</div>
		</div>
	);
}

export default ContactDetails;
