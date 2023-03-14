import { Tooltip } from '@cogoport/components';
import React from 'react';

import getShortFormatNumber from '@/ui/commons/utils/getShortFormatNumber';

function Amount({ currency = 'INR', field = 0 }) {
	const formatted = getShortFormatNumber('en', field, currency) || '';
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
