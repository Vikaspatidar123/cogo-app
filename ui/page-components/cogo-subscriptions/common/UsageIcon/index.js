import {
	IcMFairport,
	IcMFsea,
	IcMSearchdark,
	IcMDocument,
	IcMCalendar,
	IcMServices,
	IcMSchedules,
} from '@cogoport/icons-react';

const props = {
	width  : 25,
	height : 25,
	fill   : '#AFBBC5',
};
const checkoutProps = {
	width  : 25,
	height : 25,
	fill   : '#000',
};
export const UsageIconMapping = {
	'Air Tracking'          : <IcMFairport {...props} />,
	'Track-and-Trace-Air'   : <IcMFairport {...checkoutProps} />,
	'Ocean Tracking'        : <IcMFsea {...props} />,
	'Track-and-Trace-Ocean' : <IcMFsea {...checkoutProps} />,
	'Quick Quotation'       : <IcMDocument {...props} />,
	'quick-quotation'       : <IcMDocument {...checkoutProps} />,
	'Quick Quotations'      : <IcMDocument {...props} />,
	'quick-quotations'      : <IcMDocument {...checkoutProps} />,
	'Spot Search'           : <IcMSearchdark {...props} />,
	'Spot-Search'           : <IcMSearchdark {...checkoutProps} />,
	'Ocean - Air Schedules' : <IcMCalendar {...props} />,
	'Premium Services'      : <IcMServices {...props} />,
	'ocean-air-schedules'   : <IcMSchedules {...props} />,
};

export const AddonsTitleMapping = {
	'Track-and-Trace-Air'   : 'Track and Trace Air',
	'Track-and-Trace-Ocean' : 'Trace and Trace Ocean',
	'quick-quotation'       : 'Quick Quotation',
	'quick-quotations'      : 'Quick Quotations',
	'Spot-Search'           : 'Spot Search',
	'ocean-air-schedules'   : 'Ocean Air Schedules',
};
