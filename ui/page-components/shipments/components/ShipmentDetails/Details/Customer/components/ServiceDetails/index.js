// import { Modal } from '@cogoport/front/components';
// import React, { useContext, useState, useEffect } from 'react';

// import { ShipmentDetailContext } from '../../../../../commons/Context';
// import CancelHeader from '../../../../commons/CancelHeader';
// import Cancellation from '../../../../commons/Cancellation';
// import CargoDetails from '../../../../commons/CargoDetails';
// import AddTag from '../Addtag';
// import Tags from '../Tags';

// import Loader from './Loader';
// import PortDetails from './PortDetails';
// import { Container, ServiceDetail, ContainerInfo } from './styles';
import { Placeholder, Modal } from '@cogoport/components';
import { useState, useContext, useEffect } from 'react';

import { ShipmentDetailContext } from '../../../../common/Context';
import AddTag from '../AddTag';
import CancelHeader from '../CancelHeader';
import Cancellation from '../Cancellation';
import Tags from '../Tags';

import PortDetails from './PortDetails';
import styles from './styles.module.css';

import CargoDetails from '@/ui/page-components/shipments/components/CargoDetails';

function ServicDetails({ servicesForMap = false }) {
	const [open, setOpen] = useState(false);

	const [{ shipment_data, primary_service, isGettingShipment, refetch }] = useContext(ShipmentDetailContext);
	console.log(shipment_data, 'shipment_data');
	const { is_cancellation_requested } = shipment_data || {};

	const [tags, setTags] = useState([]);

	useEffect(() => {
		if (shipment_data?.tags?.length) {
			setTags(shipment_data.tags);
		}
	}, [shipment_data]);

	return isGettingShipment ? (
		<Placeholder />
	) : (
		<div className={`${styles.container} ${servicesForMap ? styles.shipment_header : ''}`}>
			<Tags
				tags={tags}
				setOpen={setOpen}
				setTags={setTags}
				shipment_data={shipment_data}
			/>

			{shipment_data.state === 'cancelled' ? <CancelHeader /> : null}

			<div className={styles.containerInfo}>
				<PortDetails
					shipment_data={shipment_data}
					primary_service={primary_service}
				/>

				<div className={styles.service_detail}>
					<CargoDetails
						primary_service={primary_service}
						shipment_data={shipment_data}
					/>

					{!is_cancellation_requested ? (
						<Cancellation
							isIE
							refetch={refetch}
							isRequested={is_cancellation_requested}
						/>
					) : null}
				</div>
			</div>

			{open && (
				<Modal
					width={500}
					show={open}
					onClose={() => setOpen(false)}
					onOuterClick={() => setOpen(false)}
				>
					<AddTag
						setTags={setTags}
						setOpen={setOpen}
						shipment_data={shipment_data}
						tags={tags}
					/>
				</Modal>
			)}
		</div>
	);
}

export default ServicDetails;
