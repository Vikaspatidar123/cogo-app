import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { UNIT_MAPPING } from '../constants';

import handleLineItemsBreakup from './handleLineItemsBreakup';
import styles from './styles.module.css';

function PriceBreakup({
	details = {},
	setShowBreakup = () => {},
	source = '',
}) {
	const containerCount = details.containers_count || 1;
	const groupedServices = {};

	(details || []).forEach((item) => {
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
				properties: (groupedServices[service] || []).map((item) => handleLineItemsBreakup(item, details, containerCount, source))[0],
			},
		];
	});

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.title_text}>Detailed Breakup</div>
				<IcMCross cursor="pointer" onClick={() => setShowBreakup(false)} />
			</div>
			{(newData || []).map((item) => {
				const { price } = item.properties.pop();
				return (
					<>
						<div className={styles.price_title}>
							<div className={styles.basic_title}>{item.service}</div>
							<div className={styles.basic_price}>{price}</div>
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
		</div>
	);
}

export default PriceBreakup;
