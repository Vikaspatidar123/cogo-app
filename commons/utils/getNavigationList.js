import MENU_LIST from '@/commons/configurations/navigation.json';

const getNavigationList = ({ isKycVerified, account_types }) => MENU_LIST.filter((menuItem) => {
	const { account_type, show } = menuItem;
	const { notKycVerified: showInNotKycVerified = false } = show || {};

	if (!isKycVerified && !showInNotKycVerified) {
		return false;
	}

	return account_type === undefined || account_types.includes(account_type);
});

export default getNavigationList;
