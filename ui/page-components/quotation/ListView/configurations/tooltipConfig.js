import { IcMEdit, IcMEyeopen, IcMDownload, IcMDelete } from '@cogoport/icons-react';

const tooltipConfig = ({ documentStatus = '', quotationId = '', setShowDeleteModal, setQuoteId }) => {
	const tooltipContentConfig = [
		{
			name      : 'Preview',
			icon      : <IcMEyeopen width={10} height={10} />,
			className : '',
			condition : true,
		},
		{
			name      : 'Download',
			icon      : <IcMDownload width={10} height={10} />,
			className : '',
			condition : true,
		},
		{
			name      : 'Edit',
			icon      : <IcMEdit width={10} height={10} />,
			className : '',
			condition : documentStatus !== 'SENT',
		},
		{
			name      : 'Delete',
			icon      : <IcMDelete width={12} height={12} />,
			className : '',
			condition : documentStatus !== 'SENT',
			onClick   : () => {
				setShowDeleteModal(true);
				setQuoteId(quotationId);
			},
		},
	];

	return tooltipContentConfig;
};

export default tooltipConfig;
