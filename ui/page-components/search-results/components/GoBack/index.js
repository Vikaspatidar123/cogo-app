import React from 'react';
import { useSelector } from '@cogo/store';
import { useRouter } from '@cogo/next';
import { IcMArrowBack } from '@cogoport/icons-react';
import { RowBack, Back } from './styles';

const GoBack = () => {
	const {
		query: { shipment_id },
	} = useSelector(({ general }) => ({
		query: (general || {}).query || {},
		scope: (general || {}).scope,
	}));

	const { push } = useRouter();

	return shipment_id ? (
		<RowBack>
			<div
				onClick={() => push('/shipments/[id]', `/shipments/${shipment_id}`)}
				role="presentation"
				style={{ marginRight: '16px', cursor: 'pointer' }}
			>
				<IcMArrowBack
					color="#333"
					style={{ marginRight: '16px', width: 20, height: 20 }}
				/>
			</div>

			<Back
				onClick={() => push('/shipments/[id]', `/shipments/${shipment_id}`)}
			>
				Go back to shipment
			</Back>
		</RowBack>
	) : null;
};

export default GoBack;
