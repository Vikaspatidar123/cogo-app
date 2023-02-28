import dynamic from 'next/dynamic';

import styles from './styles.module.css';

import Header from '@/ui/commons/components/Header';

const Footer = dynamic(() => import('./Footer'), {
	ssr: false,
});

const NavBar = dynamic(() => import('./NavBar'), {
	ssr: false,
});

function AppLayout({ children }) {
	return (
		<>
			<Header showSupportHelp showUserDetails showAnnouncements showDemo>
				<NavBar />
			</Header>

			<div className={styles.main}>{children}</div>

			<div className={styles.footer}>
				<Footer />
			</div>
		</>
	);
}

export default AppLayout;
