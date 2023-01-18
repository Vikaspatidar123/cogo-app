import { useSelector } from '@cogoport/front/store';

import Logout from './Logout';
import Profile from './Profile';
import SwitchPartner from './SwitchPartner';
import MenuProfileHeader from './MenuProfileHeader';

import { Container } from './styles';
import Subscription from './Subscription';

function Menu({ setShowPopover, showChannelPartners, setShowChannelPartners }) {
	const { tnc_accepted } = useSelector(({ profile }) => profile.partner || {});

	if (showChannelPartners) {
		return <SwitchPartner setShowChannelPartners={setShowChannelPartners} />;
	}

	return (
		<Container>
			<MenuProfileHeader setShowChannelPartners={setShowChannelPartners} />

			{tnc_accepted && <Profile setShowPopover={setShowPopover} />}
			<Subscription setShowPopover={setShowPopover} />
			<Logout />
		</Container>
	);
}

export default Menu;
