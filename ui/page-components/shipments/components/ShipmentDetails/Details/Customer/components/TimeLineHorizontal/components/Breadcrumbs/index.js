// import { ShipmentDetailContext } from '@cogo/bookings/commons/Context';
// import { useRouter } from '@cogo/next';
// import BreadCrumb from '@cogoport/front/components/admin/Breadcrumbs';
// import { IcMPin } from '@cogoport/icons-react';
// import React, { useContext, useState } from 'react';

// import updatePin from '../../../../hooks/useUpdatePin';

// import { Container } from './styles';
import { Breadcrumb } from '@cogoport/components';
import { IcMPin } from '@cogoport/icons-react';
import { useContext, useState } from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';
import useUpDatePin from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useUpDatePin';

function BreadCrumbs({ servicesForMap = false }) {
	const [contextValues] = useContext(ShipmentDetailContext);
	const { shipment_data, refetch } = contextValues || {};

	const isPinned = !!shipment_data.pinned_by_id;
	const [pinned, setPinned] = useState(isPinned);

	const router = useRouter();

	const { onPinShipment } = useUpDatePin(pinned, refetch);

	const breadcrumbs = {
		activeColor     : '#333333',
		descendentColor : '#034AFD',
		array           : [
			{
				key   : 'shipments',
				title : 'Shipments',
				href  : '/shipments',
			},
			{
				key   : 'serial_id',
				title : `#${shipment_data?.serial_id}`,
				href  : '',
			},
		],
		style: {
			fontWeight : 400,
			fontSize   : '12px',
		},
	};

	const handleClick = (detail) => {
		router.push(detail.href);
	};

	return (
		<div className={`${styles.container} ${servicesForMap ? styles.shipment_bread_crumb : ''}`}>
			<Breadcrumb
				breadCrumbs={breadcrumbs.array}
				activeColor={breadcrumbs.activeColor}
				descendentColor={breadcrumbs.descendentColor}
				style={breadcrumbs.style}
				onClick={(details) => handleClick(details)}
			/>
			{pinned ? (
				<IcMPin
					fill="yellow"
					style={{ marginLeft: '20px', cursor: 'pointer' }}
					onClick={() => {
						setPinned(!pinned);
						onPinShipment();
					}}
				/>
			) : (
				<IcMPin
					style={{ marginLeft: '20px', cursor: 'pointer' }}
					onClick={() => {
						setPinned(!pinned);
						onPinShipment();
					}}
				/>
			)}
		</div>
	);
}

export default BreadCrumbs;
