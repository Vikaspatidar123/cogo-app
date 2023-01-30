import ProfileIcon from '../icons/ProfileIcon.svg';
import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';

function Profile({ setShowPopover = () => { } }) {
	const router = useRouter();

	const handleClick = async () => {
		router.push('/profile', '/profile', true);

		setShowPopover(false);
	};

	return (
		<div className={styles.account_settings}>
			<ProfileIcon style={{ marginRight: '12px' }} />

			<div className={styles.A} as="button" onClick={(e) => handleClick(e)}>
				Account Settings
			</div>
		</div>
	);
}

export default Profile;
