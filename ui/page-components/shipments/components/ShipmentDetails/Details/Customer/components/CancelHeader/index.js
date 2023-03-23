// import { startCase } from '@cogoport/front/utils';
// import { IcCError } from '@cogoport/icons-react';
import { IcCError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { ShipmentDetailContext } from '../../../../common/Context';

import styles from './styles.module.css';
// import { ShipmentDetailContext } from '../../../commons/Context';

// import {
// 	Container,
// 	Heading,
// 	SubHeading,
// 	IconWrapper,
// 	FlexRow,
// 	FlexCol,
// } from './styles';

function CancelHeader() {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.icon_wrapper}>
					<IcCError width={25} height={25} />
				</div>

				<div className={styles.col}>
					<h3>Your Booking Is Cancelled.</h3>

					<p>
						Reason:
						{' '}
						{startCase(shipment_data?.cancellation_reason || '')}
					</p>
				</div>
			</div>
		</div>
	);
}
export default CancelHeader;
