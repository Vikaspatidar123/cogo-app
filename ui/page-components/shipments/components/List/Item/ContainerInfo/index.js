// import CargoDetails from '@cogo/business-modules/components/cargo-details';
// import ServiceDetails from '@cogo/business-modules/components/MultiServiceDetails';
import React from 'react';

import CargoDetails from '../../../CargoDetails/CargoDetailPills';
import MultiServiceDetails from '../../../CargoDetails/MultiserviceDetails';

import styles from './styles.module.css';
// import { CargoDetailsWrap, MultiService } from './styles';

function ContainerInfo({ detail }) {
	return (
		<div className={styles.cargo_wrap}>
			{detail?.shipment_type === 'fcl_freight'
			&& detail?.fcl_freight_services?.length > 1 ? (
				<div className={styles.multiservice}>
					<CargoDetails detail={detail || {}} />
					<MultiServiceDetails mainServices={detail?.fcl_freight_services}>
						+
						{detail?.fcl_freight_services?.length - 1}
						Details
					</MultiServiceDetails>
				</div>
				) : (
					<CargoDetails detail={detail || {}} />
					// <CargoDetails detail={detail || {}} />
				)}
		</div>
	);
}

export default ContainerInfo;
