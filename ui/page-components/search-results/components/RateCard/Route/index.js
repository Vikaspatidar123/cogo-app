import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import getLocationInfo from '../../AdditionalCards/MultiService/Service/locations-search';

import ShippingLine from './ShippingLine';
import styles from './styles.module.css';

const pick_services = ['trailer_freight', 'ftl_freight', 'ltl_freight'];

const mapping1 = ['fcl_customs', 'lcl_customs', 'air_customs'];

function Route({
	data = {},
	details = {},
	results_type = '',
	isOriginHaulageRates = false,
	isDestinationHaulageRates = false,
	isMobile,
}) {
	const originIcd = details?.trade_type === 'export'
		? details?.origin_port?.is_icd || details?.port?.is_icd
		: details?.origin_port?.is_icd;
	const destinationIcd = details?.trade_type === 'import'
		? details?.destination_port?.is_icd || details?.port?.is_icd
		: details?.destination_port?.is_icd;

	const getICDKeys = () => {
		let origin_key = null;
		let destination_key = null;

		if (originIcd) {
			origin_key = details?.search_type === 'fcl_customs'
        || details?.search_type === 'fcl_freight_local' ? 'main_port' : 'origin_main_port';
		} else {
			origin_key = 'origin_port';
		}

		if (destinationIcd) {
			destination_key = details?.search_type === 'fcl_customs'
        || details?.search_type === 'fcl_freight_local' ? 'main_port' : 'destination_main_port';
		} else {
			destination_key = 'destination_port';
		}

		return {
			origin      : origin_key,
			destination : destination_key,
		};
	};

	const { origin, destination } = getLocationInfo(
		'search_type',
		{ ...data, ...details },
		details?.search_type === 'fcl_freight'
      || (details?.search_type === 'fcl_customs' && details?.port?.is_icd)
      || (details?.search_type === 'fcl_freight_local' && details?.port?.is_icd)
			? getICDKeys()
			: {},
	);

	const service_ids = Object.keys(details?.service_details || {});
	const services = (service_ids || []).map((id) => ({
		...details?.service_details[id],
	}));
	const origin_services = (services || []).filter(
		(service) => service?.trade_type === 'export',
	);
	const destination_services = (services || []).filter(
		(service) => service?.trade_type === 'import',
	);

	const originPickup = (
		(origin_services || []).map((item) => item?.service_type) || []
	).filter((item) => pick_services.includes(item));
	const uniq_origin_pickup = [...new Set(originPickup)];
	const originPickupData = !isEmpty(uniq_origin_pickup)
		? (origin_services || []).filter(
			(item) => item.service_type === (uniq_origin_pickup || [])[0],
		)
		: null;

	const destinationPickup = (
		(destination_services || []).map((item) => item?.service_type) || []
	).filter((item) => pick_services.includes(item));
	const uniq_destination_pickup = [...new Set(destinationPickup)];
	const destinationPickupData = !isEmpty(uniq_destination_pickup)
		? (destination_services || []).filter(
			(item) => item.service_type === (uniq_destination_pickup || [])[0],
		)
		: null;

	const show = !isEmpty(data?.shipping_line) || !isEmpty(data?.airline);
	const showLogo = data?.shipping_line?.logo_url || data?.airline?.logo_url;

	const customMargin = {
		marginLeft: mapping1.includes(details?.search_type) ? '-15px' : '',
	};
	return (
		<div className={styles.container}>
			<ShippingLine
				show={show}
				showLogo={showLogo}
				data={data}
				isMobile={isMobile}
			/>

			<div className={styles.route_container}>
				<div style={{ width: '100%', display: 'block' }}>
					<div style={{ width: '100%', display: 'flex' }}>
						<div
							className={cl`${styles.circle} ${!isEmpty(originPickup) ? null : styles.inactive
							}`}
						/>
						<div className={styles.line} style={{ width: '100%' }} />
					</div>

					{!isEmpty(originPickup) ? (
						<div className={styles.location}>
							{(originPickupData || [])[0]?.origin_location?.name}
						</div>
					) : null}
				</div>

				{originIcd ? (
					<div style={{ width: '100%', marginLeft: '-4px' }}>
						<div style={{ width: '100%', display: 'flex' }}>
							<div className={styles.circle} />
							<div
								className={cl`${styles.line} ${isOriginHaulageRates ? styles.rates : styles.inactive
								}`}
								style={{ width: '100%' }}
							/>
						</div>
						<div className={styles.location}>
							{details?.origin_port?.port_code || details?.port?.port_code}
						</div>
					</div>
				) : null}

				{origin ? (
					<div
						style={
							results_type === 'rfq' ? { marginLeft: '-30px', display: 'block' }
								: { marginLeft: '-9px', display: 'block' }
							}
					>
						<div style={{ display: 'flex' }}>
							<div className={cl`${styles.circle} ${styles.main}`} />
							<div
								className={cl`${styles.active_line} ${destination ? styles.main : styles.inactive
								}`}
								style={{ width: '15px' }}
							/>
						</div>

						<div className={cl`${styles.location} ${styles.main}`}>
							{origin?.port_code || origin?.name}
						</div>
					</div>
				) : null}

				{destination || origin ? (
					<div style={{ display: 'block', width: '100%', ...customMargin }}>
						<div style={{ display: 'flex' }}>
							{destination?.port_code || destination?.postal_code ? (
								<div className={cl`${styles.circle} ${styles.main}`} />
							) : null}

							<div
								className={cl`${styles.line} ${
									destinationIcd || !isEmpty(destinationPickup)
										? null
										: styles.inactive
								}}`}
								style={{ width: '100%' }}
							/>
						</div>

						<div className={cl`${styles.location} ${styles.main}`}>
							{destination?.port_code || destination?.name}
						</div>
					</div>
				) : null}

				{destinationIcd ? (
					<div style={{ display: 'block', width: '100%', marginLeft: '-4px' }}>
						<div style={{ display: 'flex' }}>
							<div className={styles.circle} />
							<div
								className={cl`${styles.line} ${
									!isEmpty(destinationPickup) ? null : styles.inactive
								} 
											${!isEmpty(destinationPickup) ? null : styles.inactive} ${
									isDestinationHaulageRates ? 'rates' : ''
								}`}
								style={{ width: '100%' }}
							/>
						</div>

						<div className={styles.Location} style={{ textAlign: 'end' }}>
							{details?.destination_port?.port_code || details?.port?.port_code}
						</div>
					</div>
				) : null}

				<div style={{ display: 'flex', marginLeft: '-4px' }}>
					<div
						className={cl`${styles.circle} ${
							!isEmpty(destinationPickup) ? null : styles.inactive
						}`}
					/>

					{!isEmpty(destinationPickup) ? (
						<div className={styles.location}>
							{(destinationPickupData || [])[0]?.destination_location?.name}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Route;
