import styles from '../styles.module.css';

import logout from '@/ui/page-components/authentication/utils/getLogout';

function Logout() {
	const handleClick = async (e) => {
		e.preventDefault();
		logout();
	};

	return (
		<div className={styles.logout_container}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/logoutIcon.svg"
				alt="cogo"
				style={{ marginRight: 12 }}
			/>

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
