import { useState } from 'react';

import Logout from './Logout';
import MenuProfileHeader from './MenuProfileHeader';
import Navigation from './Navigation';
import Profile from './Profile';
import styles from './styles.module.css';
import SwitchUser from './SwitchUser';

import getSideBarConfigs from '@/packages/navigation-configs/side-bar';
import { useSelector } from '@/packages/store';

function Menu({ setShowPopover, show, setShow }) {
	const [isOpen, setIsOpen] = useState(false);

	const { user_data } = useSelector(
		({ profile }) => ({
			user_data: profile || {},
		}),
	);
	const { organization } = user_data || {};
	if (show) {
		return <div className={styles.container}><SwitchUser setShow={setShow} /></div>;
	}
	const configs = getSideBarConfigs(user_data);
	const { nav_items = {} } = configs || {};
	const { organization: nav = [] } = nav_items || {};
	const subscriptionNav = nav.find((item) => item.key === 'saas_cogo_subscription');
	const financeNav = nav.find((item) => item.key === 'saas_finance');
	return (
		<div className={styles.container}>
			<MenuProfileHeader setShow={setShow} />
			{organization?.id && <Profile setShowPopover={setShowPopover} />}
			{subscriptionNav && (
				<Navigation
					setShowPopover={setShowPopover}
					subscriptionNav={subscriptionNav}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
				/>
			)}
			{financeNav && (
				<Navigation
					setShowPopover={setShowPopover}
					subscriptionNav={financeNav}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
				/>
			)}
			<Logout />
		</div>
	);
}

export default Menu;
