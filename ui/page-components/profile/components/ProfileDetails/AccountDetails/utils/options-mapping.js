import Address from '../DetailsTabs/Address';
import AlertsPreferences from '../DetailsTabs/AlertsPreferences';
import DocumentsWallet from '../DetailsTabs/DocumentsWallet';
import MyProfile from '../DetailsTabs/MyProfile';
import OrganizationDetails from '../DetailsTabs/OrganizationDetails';

const getOptions = () => ({
	organization_details: {
		key                : 'organization_details',
		title              : 'Company Details',
		containerComponent : OrganizationDetails,
	},
	profile: {
		key                : 'profile',
		title              : 'Profile',
		containerComponent : MyProfile,
	},
	address: {
		key                : 'address',
		title              : 'Address',
		containerComponent : Address,
	},
	// documents: {
	// 	key                : 'documents',
	// 	title              : 'Documents',
	// 	containerComponent : DocumentsWallet,
	// },
	alerts_preferences: {
		key                : 'alerts_preferences',
		title              : 'Alerts and Preferences',
		containerComponent : AlertsPreferences,
	},
});

export default getOptions;
