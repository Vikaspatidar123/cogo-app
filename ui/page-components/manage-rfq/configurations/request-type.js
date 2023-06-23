import {
	IcMSearchdark,
	IcMDocument,
	IcMUpload,
	IcMTimer,
	IcMDownload,
	IcMFtick,
} from '@cogoport/icons-react';

export const CreateQuotationConfig = [
	{
		key      : 'manual',
		icon     : IcMSearchdark,
		title    : 'Manual Entry to request',
		subTitle : 'Add your POL, POD and other details',
		fill     : '#2C3E50',
		tags     : [
			{ icon: IcMFtick, label: 'Recommended', bgColor: '#DDEBC0' },
			{ icon: IcMTimer, label: 'Fastest', bgColor: '#DDEBC0' },
			{ icon: IcMDownload, label: 'Downloadable RFQ', bgColor: '#DDEBC0' },
		],
	},
	{
		key   : 'cogo_format',
		icon  : IcMDocument,
		title : 'Upload Excel in cogo format',
		subTitle:
			'Download the Cogo Format Excel > Fill the Excel > Upload the Excel',
		fill : '#96E2A2',
		tags : [{ icon: IcMTimer, label: 'Takes 7 Days' }],
	},
	{
		key   : 'unstructured',
		icon  : IcMUpload,
		title : 'Upload Request in any format',
		subTitle:
			'Will take 1 day to convert and upload. Revisit this page to view quotes later',
		fill : '#356EFD',
		tags : [{ icon: IcMTimer, label: 'Takes more than 7 Days' }],
	},
];
