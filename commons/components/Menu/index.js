import Logout from './Logout';
import MenuProfileHeader from './MenuProfileHeader';
import Profile from './Profile';
import styles from './styles.module.css';
import Subscription from './Subscription';
import SwitchPartner from './SwitchPartner';

import { useSelector } from '@/packages/store';

const INDIA = '541d1232-58ce-4d64-83d6-556a42209eb7';

function Menu({ setShowPopover, showChannelPartners, setShowChannelPartners }) {
	const { tnc_accepted, country_id } = useSelector(
		({ profile }) => profile.organization || {},
	);
	console.log(tnc_accepted, 'profile', country_id);
	const is_country_outside = country_id !== INDIA;

	if (showChannelPartners) {
		return <SwitchPartner setShowChannelPartners={setShowChannelPartners} />;
	}

	return (
		<div className={styles.container}>
			<MenuProfileHeader setShowChannelPartners={setShowChannelPartners} />

			{tnc_accepted && <Profile setShowPopover={setShowPopover} />}
			<Logout />
		</div>
	);
}

export default Menu;
