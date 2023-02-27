import dynamic from 'next/dynamic';

import { useSelector } from '../../../../../../packages/store';

import styles from './styles.module.css';

import Header from '@/ui/commons/components/Header';

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
				<Header showSupportHelp showUserDetails showAnnouncements showDemo isMobile={isMobile}>
					{!isMobile && <NavBar />}
				</Header>
			)}

			<div className={styles.main}>{children}</div>

			<div className={styles.footer}>
				<Footer />
			</div>
		</>
	);
}

export default AppLayout;
