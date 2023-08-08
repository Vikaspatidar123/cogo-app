import ContactDetails from './ContactDetails';
import styles from './styles.module.css';
import UserDetails from './UserDetails';

function ProfileProgress() {
	return (
		<div className={styles.container}>
			<div className={styles.user_details_container}><UserDetails /></div>
			<div className={styles.contact_details_container}><ContactDetails /></div>
			<div className={styles.completion_chnages} />
		</div>
	);
}

export default ProfileProgress;
