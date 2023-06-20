const { IcMAppDocumentUpload } = require('@cogoport/icons-react');

const OPERATOR = {
	ocean : 'Shipping',
	air   : 'Air',
};
const csvUploadControls = ({ trackingType = 'ocean', operatorData = {} }) => {
	const { shippingLineData = [], airLineData = [] } = operatorData || {};

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
				width      : '100%',
			},
			{
				name        : 'operatorLine',
				label       : `${OPERATOR[trackingType]} line`,
				type        : 'select',
				options     : OPTION_MAPPING[trackingType],
				placeholder : `Enter ${OPERATOR[trackingType]} Line`,
				rules       : { required: `Please select ${OPERATOR[trackingType]} line` },
				width       : '50%',

			},
		]
	);
};

export default csvUploadControls;
