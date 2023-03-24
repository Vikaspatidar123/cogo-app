import { startCase } from '@cogoport/utils';

import { UNIT_MAPPING } from '../../../constants';

import handleLineItemsBreakup from './handleLineItemsBreakup';
import styles from './styles.module.css';

import formatAmount from '@/packages/forms/utils/get-formatted-price';

function PriceBreakup({ details = {}, data = {} }) {
	const searchType = data?.service_type || 'fcl_freight';
	const containerCount = details.containers_count || 1;

	const bookingCharges = data?.booking_charges?.convenience_rate || {};

	const {
		service_type,
		total_price_currency,
		total_price_discounted,
		line_items = [],
	} = bookingCharges || {};

	const services_ids = Object.keys(data?.service_rates || {});
	const services = (services_ids || []).map((key) => ({
		...data?.service_rates[key],
		id: key,
	}));

	const groupedServices = {};

	(services || []).forEach((item) => {
		const serviceData = details?.service_details[item?.id];

		let service = '';
		if (item?.service) {
			if (item?.trade_type === 'import') {
				service = `destination_${item?.service_name}_${item?.service}`;
			} else if (item?.trade_type === 'export') {
				service = `origin_${item?.service_name}_${item?.service}`;
			} else {
				service = `${item?.service_name}_${item?.service}`;
			}
		} else if (item?.trade_type === 'import') {
			service = `destination_${item?.service_type}`;
		} else if (item?.trade_type === 'export') {
			service = `origin_${item?.service_type}`;
		} else if (
			item?.trade_type === 'domestic'
			&& details?.service_type === 'air_freight'
		) {
			service = `terminal_${serviceData?.terminal_charge_type}`;
		} else {
			service = item?.service_type;
		}
		groupedServices[service] = [...(groupedServices[service] || []), item];
	});

	const handleServicesNames = (item) => {
		const serviceObj = (groupedServices[item] || [])[0];
		let tradeType = '';
		if (serviceObj?.trade_type === 'export') {
			tradeType = 'Origin';
		}
		if (serviceObj?.trade_type === 'import') {
			tradeType = 'Destination';
		}
		const service = serviceObj?.service_name;
		const serviceType = serviceObj?.service;

		return `${tradeType} ${service} (${startCase(serviceType)})`;
	};

	let newData = [];

	(Object.keys(groupedServices) || []).forEach((service) => {
		newData = [
			...newData,
			{
				service: (groupedServices[service] || [])[0]?.service
					? handleServicesNames(service)
					: startCase(service),
				properties:
            (groupedServices[service] || []).map((item) => handleLineItemsBreakup(item, details, containerCount))[0],
			},
		];
	});

	const unit = {
		fcl_freight : '/CTR',
		lcl_freight : '/WM',
		air_freight : '/KG',
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.title_text}>Price Breakup</div>
			</div>
			{(newData || []).map((item) => {
				const { price } = item.properties.pop();
				return (
					<>
						<div className={styles.price_title}>
							<div className={styles.basic_title}>{item.service}</div>
							<div className={styles.basic_price}>
								{price}
								{' '}
								{price !== 'Fetching Rates'
									&& !price.includes('Local')
									&& unit[searchType]}
							</div>
						</div>
						<div className={styles.info_data}>
							{item.properties.map((itm) => (
								<div className={styles.info}>
									<div className={styles.info_text}>{itm.features}</div>
									<div className={styles.info_price}>
										{itm.price}
										{' '}
										{UNIT_MAPPING[itm.unit]}
									</div>
								</div>
							))}
						</div>
					</>
				);
			})}

			{line_items.length ? (
				<>
					<div className={styles.price_title}>
						<div className={styles.basic_title}>{startCase(service_type)}</div>
						<div className={styles.basic_price}>
							{formatAmount(
								total_price_discounted || 0,
								total_price_currency,
								{
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							)}
							{' '}
							{UNIT_MAPPING[bookingCharges?.line_items?.[0]?.unit]}
						</div>
					</div>
					<div className={styles.info_data}>
						{(line_items || []).map((itm) => (
							<div className={styles.info}>
								<div className={styles.info_text}>{itm.name}</div>
								<div className={styles.info_price}>
									{itm.currency}
									{' '}
									{itm.price}
									{' '}
									{UNIT_MAPPING[itm.unit]}
								</div>
							</div>
						))}
					</div>
				</>
			) : null}
		</div>
	);
}

export default PriceBreakup;
