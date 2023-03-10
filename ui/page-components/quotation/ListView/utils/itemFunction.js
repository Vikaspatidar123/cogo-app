import { Popover } from '@cogoport/components';
import { IcCGreenCircle, IcCYelloCircle, IcMOverflowDot } from '@cogoport/icons-react';

import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

const itemFunction = () => {
	const renderFunction = {
		renderAmount : (item, data) => shortFormatNumber(item, data?.currency || 'INR'),
		renderStatus : (status) => (
			<span>
				{status === 'SENT' && <IcCGreenCircle width={9} height={9} />}
				{status === 'DRAFTED' && <IcCYelloCircle width={9} height={9} />}

				<span style={{ marginLeft: '5px' }}>{status}</span>
			</span>
		),
		renderToolTip: ({ documentStatus = '', quotationId = '' }, content, item, setShowDeleteModal, setQuoteId) => (
			<Popover
				placement="bottom"
				content={content({ documentStatus, quotationId, setShowDeleteModal, setQuoteId })}
			>
				<div style={item?.style}>
					<IcMOverflowDot width={15} height={15} style={{ verticalAlign: 'middle' }} />

				</div>
			</Popover>
		),
	};
	return renderFunction;
};

export default itemFunction;
