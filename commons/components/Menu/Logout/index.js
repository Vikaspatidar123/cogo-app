/* eslint-disable jsx-a11y/no-static-element-interactions */
import { deleteCookie } from '@cogoport/utils';

import LogoutIcon from '../icons/logoutIcon.svg';
import styles from '../styles.module.css';

function Logout() {
	const handleClick = async (e) => {
		e.preventDefault();

		deleteCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

		window.location.href = '/login';
	};

	return (
		<div className={styles.logout_container}>
			<LogoutIcon style={{ marginRight: 12 }} />

			<div
				className={styles.A}
				onClick={(e) => handleClick(e)}
				style={{ color: '#ef9b9b' }}
			>
				Logout
			</div>
		</div>
	);
}

export default Logout;
