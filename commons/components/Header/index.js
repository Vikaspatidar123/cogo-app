import dynamic from 'next/dynamic';

// import RedirectLink from '../RedirectLink';

// import Cogopoints from './Cogopoints';
import CompanyDetails from './Company';
import Help from './Help';
import styles from './styles.module.css';

// import { useSelector } from '@/packages/store';

const UserDetails = dynamic(() => import('../UserDetails'), {
	ssr: false,
});

// const Logout = dynamic(() => import('../UserDetails/Menu/Logout'), {
// 	ssr: false,
// });

function Header({
	children,
	showRedirectLink,
	redirectLink,
	showSupportHelp,
	showUserDetails,
	hideLogo,
	showLogooutMobile,
}) {
	// const isMobile = useSelector(({ general }) => general.isMobile);
	// const { partner = {} } = useSelector(({ profile }) => profile);
	// const showCogoPoints = true;
	// if (partner.twin_service_provider_id) showCogoPoints = false;

	// const renderMobileLogout = () => (showLogooutMobile ? <Logout /> : null);

	return (
		<div className={styles.container}>

			{/* <div className={styles.logo}> */}
			{!hideLogo && <CompanyDetails />}
			{children}
			{/* </div> */}
			<div className={styles.right}>
				{/* {isMobile ? (
					renderMobileLogout()
				) : ( */}
				<div className={styles.right}>
					{/* {showDemo && <DemoVideos />} */}
					{showSupportHelp && <Help />}
					{/* {showCogoPoints && <Cogopoints />}
					{showRedirectLink && <RedirectLink {...redirectLink} />} */}
					{showUserDetails && <UserDetails />}
				</div>
				{/* )} */}
			</div>
		</div>
	);
}

export default Header;
