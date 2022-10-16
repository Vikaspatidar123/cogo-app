import { AdminLayout } from '@cogoport/components';
import React from 'react';

import LogoSvg from './logo.svg';

import { NAVBAR_CONFIGURATION } from '@/constants/nav';

function Layout({ children }) {
	return (
		<AdminLayout
			showTopbar
			showNavbar
			topbar={{
				logo: <LogoSvg height={20} />,
			}}
			navbar={NAVBAR_CONFIGURATION}
		>
			{children}
		</AdminLayout>
	);
}

export default Layout;
