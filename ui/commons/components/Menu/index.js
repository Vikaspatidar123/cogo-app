import { useState } from 'react';

import Logout from './Logout';
import MenuProfileHeader from './MenuProfileHeader';
import Navigation from './Navigation';
import Profile from './Profile';
import styles from './styles.module.css';
import SwitchUser from './SwitchUser';

import getSideBarConfigs from '@/packages/navigation-configs/side-bar';
import { useSelector } from '@/packages/store';

const SHOW_NAVIGATIONS = ['app_documents', 'saas_cogo_subscription', 'saas_finance'];

function Menu({ setShowPopover, show, setShow }) {
	const [isOpen, setIsOpen] = useState(false);

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { organization } = user_data || {};
	if (show) {
		return (
			<div className={styles.container}>
				<SwitchUser setShow={setShow} />
			</div>
		);
	}
	const configs = getSideBarConfigs(user_data);
	const { nav_items = {} } = configs || {};
	const { organization: nav = [] } = nav_items || {};

	const filterData = nav.filter((item) => SHOW_NAVIGATIONS.includes(item.key));

	return (
		<div className={styles.container}>
			<MenuProfileHeader setShow={setShow} />
			{organization?.id && <Profile setShowPopover={setShowPopover} />}
			{(filterData || []).map((item) => (
				<Navigation
					setShowPopover={setShowPopover}
					item={item}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
				/>
			))}

			<Logout />
		</div>
	);
}

export default Menu;
