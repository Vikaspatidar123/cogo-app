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
	const { serial_id } = shipment_data || {};
	const isPinned = !!shipment_data.pinned_by_id;
	const [pinned, setPinned] = useState(isPinned);

	const router = useRouter();

	const { onPinShipment } = useUpDatePin(pinned, refetch);

	const handleClick = () => {
		router.push('/shipments');
	};
	const show_shipment_id = serial_id || '....';

	return (
		<div className={`${styles.container} ${servicesForMap ? styles.shipment_bread_crumb : ''}`}>
			<Breadcrumb>
				<Breadcrumb.Item
					label="Shipments"
					onClick={() => handleClick()}
					style={{ color: 'blue' }}
					className={styles.back_to_shipment}
				/>
				<Breadcrumb.Item label={show_shipment_id} />
			</Breadcrumb>
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
