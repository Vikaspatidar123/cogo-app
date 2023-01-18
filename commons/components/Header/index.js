import { useSelector } from '@cogoport/front/store';
import dynamic from 'next/dynamic';

import Help from './Help';
import CompanyDetails from './Company';
import Cogopoints from './Cogopoints';
import RedirectLink from '../RedirectLink';

import { Container, Right } from './styles';

const UserDetails = dynamic(() => import('../UserDetails'), {
	ssr: false,
});

const Logout = dynamic(() => import('../UserDetails/Menu/Logout'), {
	ssr: false,
});

function Header({
	children,
	showRedirectLink,
	redirectLink,
	showSupportHelp,
	showUserDetails,
	hideLogo,
	showLogooutMobile,
}) {
	const isMobile = useSelector(({ general }) => general.isMobile);
	const { partner = {} } = useSelector(({ profile }) => profile);
	let showCogoPoints = true;
	if (partner.twin_service_provider_id) showCogoPoints = false;

	const renderMobileLogout = () => (showLogooutMobile ? <Logout /> : null);

	return (
		<Container>
			{!hideLogo && <CompanyDetails />}

			{children}

			<Right>
				{isMobile ? (
					renderMobileLogout()
				) : (
					<Right>
						{/* {showDemo && <DemoVideos />} */}
						{showSupportHelp && <Help />}
						{showCogoPoints && <Cogopoints />}
						{showRedirectLink && <RedirectLink {...redirectLink} />}
						{showUserDetails && <UserDetails />}
					</Right>
				)}
			</Right>
		</Container>
	);
}

export default Header;
