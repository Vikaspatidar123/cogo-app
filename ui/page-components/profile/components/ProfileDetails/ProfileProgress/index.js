import ChangeLanguage from './ChangeLanguage';
import ContactDetails from './ContactDetails';
import Edit from './Edit';
import styles from './styles.module.css';
import UserDetails from './UserDetails';

function ProfileProgress() {
	return (
		<div className={styles.container}>
			<div className={styles.user_details_container}><UserDetails /></div>
			<div className={styles.contact_details_container}><ContactDetails /></div>
			<div className={styles.completion_chnages} />
			{/* <div className={styles.progress_completion_container}><ChangeLanguage /></div> */}

		</div>
	);
}

export default ProfileProgress;
