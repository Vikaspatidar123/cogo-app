import AccountDetails from './AccountDetails';
import ProfileProgress from './ProfileProgress';
import styles from './styles.module.css';

function ProfileDetails() {
	return (
		<>
			<ProfileProgress />

			<div className={styles.container}>
				<AccountDetails />
			</div>
		</>
	);
}
export default ProfileDetails;
