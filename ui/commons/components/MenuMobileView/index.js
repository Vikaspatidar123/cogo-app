/* eslint-disable jsx-a11y/no-static-element-interactions */
import { IcMArrowNext } from '@cogoport/icons-react';
import { useState } from 'react';

import Logout from '../Menu/Logout';
import MenuProfileHeader from '../Menu/MenuProfileHeader';
import SwitchUser from '../Menu/SwitchUser';

import styles from './styles.module.css';
import Subnavigation from './SubNavigation';

import getSideBarConfigs from '@/packages/navigation-configs/side-bar';
import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function MobileMenu() {
	const { push, pathname } = useRouter();
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { organization:org, branch } = user_data || {};
	const [show, setShow] = useState(false);

	if (show) {
		return <SwitchUser setShow={setShow} />;
	}

	const unPrefixedPath = `/${pathname.replace('/[org_id]/[branch_id]/', '')}`;
	const configs = getSideBarConfigs(user_data);
	const { nav_items = {} } = configs || {};
	const { organization = [] } = nav_items || {};
	const navigationMapping = [];
	organization.forEach((navigationItem) => {
		navigationMapping.push(navigationItem);
	});
	console.log(organization, 'organization', navigationMapping);

	const getRedirectUrl = (href, as) => {
		if (href?.includes('/v2')) {
			const newHref = href?.replace('/v2', '');
			const newAs = as?.replace('/v2', '');
			push(newHref, newAs);
		} else {
			window.location.href = `/app/${org?.id}/${branch?.id}/importer-exporter/${href}`;
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.profile_container}>
				<MenuProfileHeader setShow={setShow} />
			</div>
			<div className={styles.border_line} />

			{navigationMapping.map((menuItem) => (
				(menuItem?.showInNav || menuItem.showMobileNav) && (
					<div className={styles.tools_container} key={menuItem.href}>
						{!menuItem.isSubNavs ? (
							<div
								className={styles.styled_button}
								onClick={() => getRedirectUrl(menuItem.href, menuItem.as)}
							>
								<div className={styles.button_text}>{menuItem.title}</div>

								<div className={styles.arrow_icon_container}>
									<IcMArrowNext />
								</div>

							</div>
						) : <Subnavigation menuItem={menuItem} getRedirectUrl={getRedirectUrl} />}
						<div className={styles.line} />
						<div />
					</div>
				)
			))}

			<Logout />
		</div>
	);
}

export default MobileMenu;
