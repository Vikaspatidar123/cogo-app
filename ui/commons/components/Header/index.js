import dynamic from 'next/dynamic';

import CogoPoint from '../CogoPoint';

import CompanyDetails from './Company';
import styles from './styles.module.css';

const UserDetails = dynamic(() => import('../UserDetails'), {
	ssr: false,
});

function Header({ children, showUserDetails }) {
	return (
		<div className={styles.container}>
			<CompanyDetails />
			{children}

			<div className={styles.right}>
				<CogoPoint />
				{showUserDetails && <UserDetails />}
			</div>
		</div>
	);
}

export default Header;
