import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import GLOBAL_CONSTANTS from '../../constants/globals';
import NetPromoterScore from '../NetPromoterScore/Components';

import Logout from './Logout';
import MenuProfileHeader from './MenuProfileHeader';
import Navigation from './Navigation';
import Profile from './Profile';
import styles from './styles.module.css';
import SwitchUser from './SwitchUser';

import getSideBarConfigs from '@/packages/navigation-configs/side-bar';
import { useSelector } from '@/packages/store';

function Menu({ setShowPopover, show, setShow }) {
	const { t } = useTranslation(['common']);

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const [isOpen, setIsOpen] = useState(false);

	const { organization } = user_data || {};

	const configs = getSideBarConfigs({ userData: user_data, t });
	const { nav_items = {} } = configs || {};
	const { organization: nav = [] } = nav_items || {};

	const filterData = nav.filter((item) => GLOBAL_CONSTANTS.PROFILE_NAVIGATIONS.includes(item.key));

	if (show) {
		return (
			<div className={styles.container}>
				<SwitchUser setShow={setShow} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<MenuProfileHeader setShow={setShow} />
			{organization?.id ? <Profile setShowPopover={setShowPopover} /> : null}
			{(filterData || []).map((item) => (
				<Navigation
					setShowPopover={setShowPopover}
					item={item}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					key={item.title}
				/>
			))}
			<NetPromoterScore />

			<Logout />
		</div>
	);
}

export default Menu;
