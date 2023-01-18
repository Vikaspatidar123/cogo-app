import AdminLayout from '@cogoport/components';
import React from 'react';

import navigationMappings from '../../helpers/nav';

function Layout({ children, layout }) {
	const hideLayout = layout === 'hidden';

	if (hideLayout) {
		return <div>{children}</div>;
	}

	return (
		<AdminLayout
			showNavbar
			showTopbar
			navbar={navigationMappings}
		>
			<div style={{ margin: 0, padding: '24px 20px' }}>{children}</div>
		</AdminLayout>
	);
}

export default Layout;
