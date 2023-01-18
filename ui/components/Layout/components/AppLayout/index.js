import dynamic from 'next/dynamic';

import { useSelector } from '../../../../../packages/store';
import Header from '../../../Header';

import styles from './styles.module.css';

const Footer = dynamic(() => import('./Footer'), {
	ssr: false,
});

const NavBar = dynamic(() => import('./NavBar'), {
	ssr: false,
});

function AppLayout({ children, mobile }) {
	const { isMobile } = useSelector(({ general }) => general);

	const hideHeader = isMobile && mobile?.hideHeader;

	return (
		<>
			{!hideHeader && (
				<Header showSupportHelp showUserDetails showAnnouncements showDemo>
					{!isMobile && <NavBar />}
				</Header>
			)}

			<div className={styles.main}>{children}</div>

			{isMobile && <Footer />}
		</>
	);
}

export default AppLayout;
