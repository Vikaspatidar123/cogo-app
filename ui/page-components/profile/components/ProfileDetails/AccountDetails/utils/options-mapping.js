import { IcMAlert, IcMBusinessFinance, IcMDocument, IcMMap, IcMProfile, IcMTeam } from '@cogoport/icons-react';

import Address from '../DetailsTabs/Address';
import AlertsPreferences from '../DetailsTabs/AlertsPreferences';
import DocumentsWallet from '../DetailsTabs/DocumentsWallet';
import MyProfile from '../DetailsTabs/MyProfile';
import OrganizationDetails from '../DetailsTabs/OrganizationDetails';
import Team from '../DetailsTabs/Team';

const getOptions = ({ t }) => ({
	profile: {
		key                : 'profile',
		title              : t('settings:settings_page_tab_2'),
		containerComponent : MyProfile,
		icon               : <IcMProfile />,
	},
	team: {
		key                : 'team',
		title              : 'My Team',
		containerComponent : Team,
		icon               : <IcMTeam />,
	},
	organization_details: {
		key                : 'organization_details',
		title              : t('settings:settings_page_tab_1'),
		containerComponent : OrganizationDetails,
		icon               : <IcMBusinessFinance />,
	},
	address: {
		key                : 'address',
		title              : t('settings:settings_page_tab_3'),
		containerComponent : Address,
		icon               : <IcMMap />,
	},
	alerts_preferences: {
		key                : 'alerts_preferences',
		title              : t('settings:settings_page_tab_4'),
		containerComponent : AlertsPreferences,
		icon               : <IcMAlert />,
	},
	documents: {
		key                : 'documents',
		title              : 'Documents',
		containerComponent : DocumentsWallet,
		icon               : <IcMDocument />,
	},
});

export default getOptions;
