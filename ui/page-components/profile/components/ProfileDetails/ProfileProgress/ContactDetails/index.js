import { useSelector } from '@/packages/store';
import styles from './styles.module.css'
// const geo = getGeoConstants();

function ContactDetails() {
	const { profile = {} } = useSelector((state) => state);

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.label_text}>Mobile Number</div>
				<div className={styles.value_text}>
					{profile.mobile_number
						? `${profile.mobile_country_code
						} ${profile.mobile_number}`
						: '-'}
				</div>
			</div>

			<div className={styles.sub_container}>
				<div className={styles.label_text}>WhatsApp Number</div>
				<div className={styles.value_text}>
					{profile.whatsapp_number
						? `${profile.whatsapp_country_code
						} ${profile.whatsapp_number}`
						: '-'}
				</div>
			</div>

			<div className={`${styles.sub_container}${styles.last_item}`}>
				<div className={styles.label_text}>Email ID</div>
				<div className={styles.value_text}>{profile.email}</div>
			</div>
		</div>
	);
}

export default ContactDetails;
