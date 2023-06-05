import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function GoBack() {
	const {
		query: { shipment_id },
	} = useSelector(({ general }) => ({
		query : (general || {}).query || {},
		scope : (general || {}).scope,
	}));

	const { push } = useRouter();

	return shipment_id ? (
		<div className={styles.row_back}>
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

			<div
				role="presentation"
				className={styles.back}
				onClick={() => push('/shipments/[id]', `/shipments/${shipment_id}`)}
			>
				Go back to shipment
			</div>
		</div>
	) : null;
}

export default GoBack;
