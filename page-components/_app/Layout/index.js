import { AppLayout } from '@cogoport/components';
import React from 'react';

import LogoSvg from './logo.svg';

import { NAVBAR_CONFIGURATION } from '@/constants/nav';

function Layout({ children }) {
	return (
		<AppLayout
			showTopbar
			showStartbar
			topbar={{
				logo: <LogoSvg height={20} />,
			}}
			startbar={NAVBAR_CONFIGURATION}
		>
			{children}
		</AppLayout>
	);
}

export default Layout;
