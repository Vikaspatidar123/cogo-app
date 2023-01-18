import { useRouter } from '@/temp/next';

import ProfileIcon from '../icons/ProfileIcon.svg';

import { A, AccountSettings } from '../styles';

function Profile({ setShowPopover = () => {} }) {
	const router = useRouter();

	const handleClick = async () => {
		router.push('/profile', '/profile', true);

		setShowPopover(false);
	};

	return (
		<AccountSettings>
			<ProfileIcon style={{ marginRight: '12px' }} />

			<A as="button" onClick={(e) => handleClick(e)}>
				Account Settings
			</A>
		</AccountSettings>
	);
}

export default Profile;
