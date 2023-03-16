import { IcMEdit, IcMPreview, IcMDownload, IcMDelete } from '@cogoport/icons-react';

const tooltipConfig = ({ documentStatus = '', quotationId = '', setShowDeleteModal, setQuoteId, redirectData }) => {
	const {
		redirectQuotation,
		redirectPreview,
		redirectEdit,
		downloadQuotation,
	} = redirectData || {};

	const tooltipContentConfig = [
		{
			name      : 'Preview',
			icon      : <IcMPreview width={10} height={10} />,
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
			onClick   : () => {
				redirectEdit(quotationId);
			},
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
