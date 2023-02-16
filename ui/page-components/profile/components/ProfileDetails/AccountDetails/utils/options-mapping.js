import Address from '../DetailsTabs/Address';
// import AlertsPreferences from '../DetailsTabs/AlertsPreferences';
// import DocumentsWallet from '../DetailsTabs/DocumentsWallet';
// import MyProfile from '../DetailsTabs/MyProfile';
import OrganizationDetails from '../DetailsTabs/OrganizationDetails';
import Services from '../DetailsTabs/ServicesTab';
// import TeamDetails from '../DetailsTabs/TeamDetails';
// import TradeParty from '../DetailsTabs/TradeParty';

const getOptions = () => ({
	organization_details: {
		key: 'organization_details',
		title: 'Your Company Details',
		containerComponent: OrganizationDetails,
	},
	profile: {
		key: 'profile',
		title: 'Your Profile',
		// containerComponent: MyProfile,
	},
	address: {
		key: 'address',
		title: 'Your Address',
		containerComponent: Address,
	},
	documents: {
		key: 'documents',
		title: 'Your Documents',
		// containerComponent: DocumentsWallet,
	},
	services: {
		key: 'services',
		title: 'Your Services',
		containerComponent: Services,
	},
	team_details: {
		key: 'team_details',
		title: 'Your Team Details',
		// containerComponent: TeamDetails,
	},
	trade_party: {
		key: 'trade_party',
		title: 'Trade Party',
		// containerComponent: TradeParty,
	},
	alerts_preferences: {
		key: 'alerts_preferences',
		title: 'Alerts and Preferences',
		// containerComponent: AlertsPreferences,
	},
});

export default getOptions;
