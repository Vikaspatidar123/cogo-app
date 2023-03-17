import ProfileIcon from '../icons/ProfileIcon.svg';
import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';

function Profile({ setShowPopover = () => {} }) {
	const router = useRouter();

	const handleClick = async () => {
		router.push('/settings', '/settings', true);

		setShowPopover(false);
	};

	return (
		<div className={styles.account_settings}>
			<ProfileIcon style={{ marginRight: '12px' }} />

			<div
				className={styles.a_container}
				onClick={(e) => handleClick(e)}
				role="presentation"
			>
				Account Settings
			</div>
		</div>
	);
}

export default Profile;
