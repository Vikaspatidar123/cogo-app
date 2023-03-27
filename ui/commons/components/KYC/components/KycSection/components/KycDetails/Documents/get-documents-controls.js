import { IcMUpload } from '@cogoport/icons-react';

const uploadIcon = () => <IcMUpload size={3.0} />;

const controls = [
	{
		name  : 'business_address_proof',
		label : 'Upload Company Address Proof',
		drag  : true,
		type  : 'file',
		lowerlabel:
			'Electricity Bill/Telephone Bill (the document submitted should not be 3 months old)',
		span       : 6,
		height     : 76,
		uploadIcon,
		uploadType : 'aws',
		accept     : '.png,.pdf,.jpg,.jpeg',
		rules      : { required: true },
	},
];

export default controls;
