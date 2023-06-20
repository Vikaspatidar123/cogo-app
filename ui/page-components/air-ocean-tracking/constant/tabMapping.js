import { IcMListView, IcMMap } from '@cogoport/icons-react';

const TAB_MAPPING = {
	ocean : 'Ocean',
	air   : 'Air',
};

const VIEW_MAPPING = {
	All                : 'All',
	CONTAINER_NO       : 'Container View',
	'BOOKING_NO/BL_NO' : 'BL View',
};

const DASHBOARD_VIEW_MAPPING = {
	list : <IcMListView width={20} height={20} />,
	map  : <IcMMap width={20} height={20} />,
};

export { TAB_MAPPING, VIEW_MAPPING, DASHBOARD_VIEW_MAPPING };
