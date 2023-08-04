import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import possibleFullRouteConfigs from '../../../../../../../constants/possible-full-route.json';
import { ShipmentDetailContext } from '../../../../../common/Context';

import AdditionalServicesList from './AdditionalServices';
import Assured from './Assured';
import NoServiceFound from './NoServiceFound';
import ServiceDetails from './ServiceDetails';
import styles from './styles.module.css';
import TermsAndConditions from './TermsandConditions';

import { helperFuncs } from '@/ui/page-components/shipments/helpers/helperFuncs';
import { upsellTransportation } from '@/ui/page-components/shipments/helpers/upsellTransportation';

function Overview({
	quickAction,
	setQuickAction = () => {},
	servicesLoading = false,
	servicesList = [],
}) {
	const [context] = useContext(ShipmentDetailContext);
	const {
		shipment_data, primary_service,
		trade_party_type : tradePartyType, is_end_to_end : isEndToEnd,
	} = context || {};

	const mainServiceName = primary_service?.service_type || '';
	const possibleFullRoute = possibleFullRouteConfigs?.[mainServiceName];

	const { renderItem } = helperFuncs(servicesList, primary_service);
	const serviceObj = {
		origin              : [],
		multipleMainService : [],
		destination         : [],
		mainService         : [],
	};

	possibleFullRoute?.map((routeService) => renderItem(routeService, serviceObj));

	const { cancelUpsellOriginFor, cancelUpsellDestinationFor } = upsellTransportation(serviceObj, primary_service);

	const showOrigin = isEndToEnd ? tradePartyType === 'shipper' : true;

	const showDestination = isEndToEnd ? tradePartyType === 'consignee' : true;

	return (
		<div className={styles.container}>
			<div className={styles.services}>
				{!servicesLoading ? (
					<div className={styles.service_container}>
						<div className={styles.card_block}>
							<div className={styles.heading}>ORIGIN SERVICES</div>
							{showOrigin
								? (serviceObj.origin || []).map((service) => (
									<ServiceDetails
										cancelUpsellFor={cancelUpsellOriginFor}
										serviceData={service}
										serviceList={servicesList}
										shipmentData={shipment_data}
									/>
								)) : <NoServiceFound serviceName="Origin" />}
						</div>

						<div className={styles.line} />
						<div className={styles.card_block}>
							<span className={styles.heading}>MAIN SERVICES</span>
							{ !isEmpty(serviceObj.multipleMainService)
								? (serviceObj.multipleMainService || []).map((service) => (
									<ServiceDetails
										serviceData={service?.services[0]}
										serviceList={servicesList}
										shipmentData={shipment_data}
										similarServices={service}
									/>
								)) : (
									<NoServiceFound serviceName="Main" />
								)}
						</div>

						<div className={styles.line} />
						<div className={styles.card_block}>
							<div className={styles.heading}> DESTINATION SERVICES </div>
							{showDestination
								? (serviceObj.destination || []).map((service) => (
									<ServiceDetails
										cancelUpsellFor={cancelUpsellDestinationFor}
										serviceData={service}
										serviceList={servicesList}
										shipmentData={shipment_data}
									/>
								)) : <NoServiceFound serviceName="Destination" />}
						</div>
					</div>
				) : (
					<Placeholder />
				)}

				<div className={styles.right_panel}>
					<AdditionalServicesList
						services={servicesList}
						title_text="SUGGESTED SERVICES"
						quickAction={quickAction}
						setQuickAction={setQuickAction}
					/>
				</div>
			</div>

			{shipment_data?.is_cogo_assured ? (
				<Assured shipment_data={shipment_data} />
			) : null}

			{shipment_data?.terms_and_conditions?.length > 0 ? (
				<TermsAndConditions shipment_data={shipment_data} />
			) : null}
		</div>
	);
}

export default Overview;
