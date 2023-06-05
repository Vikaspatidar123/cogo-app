import { IcMError, IcMFtick } from '@cogoport/icons-react';

export const TITLE_MAPPING = {
	CONTAINER_NO       : 'Container No.',
	'BOOKING_NO/BL_NO' : 'BL/Booking No:',
};

export const LOADING_ARR = [...Array(3).keys()];

export const SHIPMENT_INFO_MAPPING = {
	container_no : 'Container no',
	commodity    : 'Commodity',
};

export const DEFAULT_STATUS = [false, false, false, false];

export const MILESTONE_MAPPING = {
	origin        : 'Origin',
	portLoading   : 'Port of Loading',
	portDischarge : 'Port of discharge',
	destination   : 'Destination',
};

export const SEVERITY_MAPPING = {
	HIGH: {
		title : 'Attention Needed',
		icon  : <IcMError fill="#EE3425" width={20} height={20} />,
		class : 'error',

	},
	LOW: {
		title : 'On Track',
		icon  : <IcMFtick fill="#ABCD62" width={20} height={20} />,
		class : 'success',

	},
};
