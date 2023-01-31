import Logout from './Logout';
import MenuProfileHeader from './MenuProfileHeader';
import Profile from './Profile';
import styles from './styles.module.css';
import Subscription from './Subscription';
import SwitchUser from './SwitchUser';

import { useSelector } from '@/packages/store';

const INDIA = '541d1232-58ce-4d64-83d6-556a42209eb7';

function Menu({ setShowPopover, show, setShow }) {
	const { country_id, id } = useSelector(
		({ profile }) => profile.organization || {},
	);
	const is_country_outside = country_id !== INDIA;

	if (show) {
		return <div className={styles.container}><SwitchUser setShow={setShow} /></div>;
	}

	return (
		<div className={styles.container}>
			<MenuProfileHeader setShow={setShow} />

			{id && <Profile setShowPopover={setShowPopover} />}
			<Logout />
		</div>
	);
}

export default Menu;
