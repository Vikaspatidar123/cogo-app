import { ToolTip } from '@cogoport/front/components';
import { startCase } from '@cogoport/front/utils';
import React from 'react';

import { AlertMessage, RateType, Container } from './styles';

function AirTags({ data }) {
	return (
		<Container>
			{data?.rate_type && data?.rate_type !== 'general' ? (
				<RateType>{startCase(data?.rate_type)}</RateType>
			) : null}

			<ToolTip
				placement="top-end"
				theme="light"
				animation="shift-away"
				content={(
					<li>
						{`Basic freight is ${
							data?.price_type === 'all_in' ? 'inclusive' : 'exclusive'
						} of surcharges`}
					</li>
				)}
			>
				{data?.price_type === 'all_in' ? (
					<AlertMessage>All Inclusive</AlertMessage>
				) : (
					<AlertMessage>Net - Net</AlertMessage>
				)}
			</ToolTip>
		</Container>
	);
}

export default AirTags;
