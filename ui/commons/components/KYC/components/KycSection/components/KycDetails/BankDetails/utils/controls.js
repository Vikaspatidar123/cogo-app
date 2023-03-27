const DOCUMENT_UPLOAD_MAX_SIZE = '5242880';

const controls = [
	{
		id    : 'cp-lsp__onboarding__accountInformation__bankDetails__account_holder_name',
		name  : 'account_holder_name',
		label : 'Account Holder Name',
		type  : 'text',
		span  : 6,
		rules : {
			required: true,
		},
	},
	{
		id    : 'cp-lsp__onboarding__accountInformation__bankDetails__bank_account_number',
		name  : 'bank_account_number',
		label : 'Account Number',
		type  : 'text',
		span  : 6,
		rules : {
			required: true,
		},
	},
	{
		id    : 'cp-lsp__onboarding__accountInformation__bankDetails__ifsc_number',
		name  : 'ifsc_number',
		label : 'IFSC Code',
		type  : 'text',
		span  : 6,
		rules : {
			required: true,
		},
	},
	{
		id    : 'cp-lsp__onboarding__accountInformation__bankDetails__bank_name',
		name  : 'bank_name',
		label : 'Bank Name',
		type  : 'text',
		span  : 6,
		rules : {
			required: true,
		},
	},
	{
		id    : 'cp-lsp__onboarding__accountInformation__bankDetails__branch_name',
		name  : 'branch_name',
		label : 'Branch Name',
		type  : 'text',
		span  : 6,
		rules : {
			required: true,
		},
	},
	{
		id    : 'cp-lsp__onboarding__accountInformation__bankDetails__cancelled_cheque',
		name  : 'cancelled_cheque',
		label : 'Cancelled Cheque',
		lowerlabel:
			'Please share cancelled Cheque with us to streamline payouts for you',
		type       : 'file',
		drag       : true,
		span       : 12,
		height     : 80,
		uploadType : 'aws',
		accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx',
		maxSize    : DOCUMENT_UPLOAD_MAX_SIZE,
		rules      : { required: true },
	},
	// {
	// 	id: 'cp-lsp__onboarding__accountInformation__bankDetails__invoices',
	// 	name: 'invoices',
	// 	lowerlabel: 'Please share invoices with us to streamline payouts for you',
	// 	type: 'file',
	// 	drag: true,
	// 	span: 12,
	// 	height: 126,
	// 	uploadType: 'aws',
	// 	accept: '.png,.pdf,.jpg,.jpeg,.doc,.docx',
	// 	maxSize: DOCUMENT_UPLOAD_MAX_SIZE,
	// 	multiple: true,
	// 	rules: { required: true },
	// },
];

export const getControls = ({
	// MIN_UPLOAD_INVOICE,
	values = {},
	isFormSaved = false,
}) => controls.map((control) => {
	const { name = '' } = control;

	const newControl = {
		...control,
		value    : values[name] || '',
		disabled : isFormSaved,
	};

	// if (name === 'invoices') {
	// 	newControl = {
	// 		...newControl,
	// 		label: `Upload ${MIN_UPLOAD_INVOICE} Invoices`,
	// 	};
	// }

	return newControl;
});
