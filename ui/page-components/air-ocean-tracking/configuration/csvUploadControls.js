const { IcMAppDocumentUpload } = require('@cogoport/icons-react');

const OPERATOR = {
	ocean : 'Shipping',
	air   : 'air',
};
const csvUploadControls = ({ trackingType = 'ocean', shippingLineData = [], airLineData = [] }) => {
	const OPTION_MAPPING = {
		ocean : shippingLineData,
		air   : airLineData,
	};
	return (
		[
			{
				name       : 'fileValue',
				type       : 'file',
				uploadDesc : 'Drag your files here or browse',
				uploadIcon : <IcMAppDocumentUpload width={50} height={50} />,
				accept     : '.csv',
			},
			{
				name        : 'operatorLine',
				label       : `${OPERATOR[trackingType]} line`,
				type        : 'select',
				options     : OPTION_MAPPING[trackingType],
				placeholder : 'Enter Shipping Line',
				rules       : { required: `Please select ${OPERATOR[trackingType]} line` },
			},
		]
	);
};

export default csvUploadControls;
