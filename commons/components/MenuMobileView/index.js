// import { get } from '@cogoport/front/utils';
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

	// const {
	// 	profile: { organization },
	// } = useSelector((reduxState) => reduxState);
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	// const { account_type, kyc_status } = organization;

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
		// if (kyc_status) {
		// const navigationAccountTypes = get(navigationItem, 'account_type') || [];

		// const isAccountTypePresent = account_type.some((accType) => {
		// 	return navigationAccountTypes.includes(accType);
		// });

		// if (isAccountTypePresent) {
		navigationMapping.push(navigationItem);
		// }
		// }
	});

	return (
		<div className={styles.container}>
			<div className={styles.profile_container}>
				<MenuProfileHeader setShow={setShow} />
			</div>
			<div className={styles.border_line} />

			{navigationMapping.map((menuItem) => (
				{
					menuItem?.showInNav && < div className={styles.tools_container} key={menuItem.href} >
					{!menuItem.isSubNavs ? (
						<div className={styles.styled_button} onClick={() => push(menuItem.as)}>
							<div className={styles.button_text}>{menuItem.title}</div>

							<div className={styles.arrow_icon_container}>
								<IcMArrowNext />
							</div>
						</div>
					) : <Subnavigation menuItem={menuItem} push={push} />}

					<div />}
				</div>
			))
			}

			<Logout />
		</div >
	);
}

export default MobileMenu;
