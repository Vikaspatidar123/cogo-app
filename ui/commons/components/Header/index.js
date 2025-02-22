import dynamic from 'next/dynamic';

import CogoPoint from '../CogoPoint';
import LanguageSelect from '../LanguageSelect';

import CompanyDetails from './Company';
import Help from './Help';
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
				<Help />
				<LanguageSelect />
				<CogoPoint />
				{showUserDetails && <UserDetails />}
			</div>
		</div>
	);
}

export default Header;
