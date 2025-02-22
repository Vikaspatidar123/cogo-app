import { Tooltip } from '@cogoport/components';
import React from 'react';

import formatAmount from '@/ui/commons/utils/formatAmount';

function Amount({ currency = 'INR', field = 0 }) {
	const formatted = formatAmount({
		amount  : field,
		currency,
		options : {
			notation : 'standard',
			style    : 'currency',
		},
	});
	return (
		<div>
			{formatted?.length > 16 ? (
				<Tooltip theme="light" placement="top" content={formatted}>
					<div>{`${formatted.substring(0, 16)}..`}</div>
				</Tooltip>
			) : (
				<div>{formatted}</div>
			)}
		</div>
	);
}

export default Amount;
