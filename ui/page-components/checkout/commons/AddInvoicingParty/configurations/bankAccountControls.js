import { IcMFileUploader } from '@cogoport/icons-react';

const bankAccountControls = [
	{
		name  : 'ifsc_number',
		label : 'IFSC Code',
		type  : 'text',
		span  : 6,
		rules : { required: 'IFSC code is required' },
	},
	{
		name  : 'account_holder_name',
		label : 'Account Holder Name',
		type  : 'text',
		span  : 6,
		rules : { required: 'Account Holder Name is required' },
	},
	{
		name  : 'bank_account_number',
		label : 'Bank Account Number',
		type  : 'text',
		span  : 6,
		rules : { required: 'Bank account number is required' },
	},
	{
		name  : 'bank_name',
		label : 'Bank Name',
		type  : 'text',
		span  : 6,
		rules : { required: true },
	},
	{
		name  : 'branch_name',
		label : 'Branch Name',
		type  : 'text',
		span  : 6,
		rules : { required: 'Branch Name is required' },
	},
	{
		name       : 'image_url',
		label      : 'Upload Cancelled Cheque',
		type       : 'file',
		drag       : true,
		uploadIcon : () => <IcMFileUploader />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
];

export default bankAccountControls;
