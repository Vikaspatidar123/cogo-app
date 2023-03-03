/* eslint-disable no-undef */
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
				className={styles.a_container}
				onClick={(e) => handleClick(e)}
				style={{ color: '#ef9b9b' }}
				role="presentation"
			>
				Logout
			</div>
		</div>
	);
}

export default Logout;
