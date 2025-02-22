import { cl } from '@cogoport/components';

import CreateNew from './CreateNew';
import Header from './Header';
import styles from './styles.module.css';

function ServiceDetails({
	serviceData = {},
	serviceList = [],
	shipmentData = {},
	similarServices = {},
	cancelUpsellFor = '',
}) {
	const {
		routeLeg = '',
		cancellation_reason = '',
		service_type = '',
	} = serviceData;

	const state = cancellation_reason ? 'cancelled' : serviceData?.state;
	return state ? (
		<div className={cl`${styles.state} ${styles.container}`}>
			<Header
				state={state}
				heading={similarServices?.routeLeg?.display || routeLeg?.display}
				serviceData={serviceData}
				similarServices={similarServices}
				service_type={service_type}
			/>
		</div>
	) : (
		routeLeg?.service_types?.[0] !== cancelUpsellFor && (
			<div className={styles.create_container}>
				<CreateNew
					routeLeg={routeLeg}
					serviceList={serviceList}
					shipment_data={shipmentData}
					isIE
				/>
			</div>
		)
	);
}

export default ServiceDetails;
