/* eslint-disable no-unused-vars */
import dynamic from 'next/dynamic';

// import RedirectLink from '../RedirectLink';

// import Cogopoints from './Cogopoints';
import CompanyDetails from './Company';
import Help from './Help';
import styles from './styles.module.css';

const UserDetails = dynamic(() => import('../UserDetails'), {
	ssr: false,
});

function Header({
	children,
	showUserDetails,
}) {
	return (
		<div className={styles.container}>

			<CompanyDetails />
			{children}

			<div className={styles.right}>
				{/* {showSupportHelp && <Help />} */}
				{showUserDetails && <UserDetails />}
			</div>
		</div>
	);
}

export default Header;
