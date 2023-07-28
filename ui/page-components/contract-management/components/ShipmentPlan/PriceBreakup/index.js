import { startCase } from '@cogoport/utils';
import React from 'react';

import { UNIT_MAPPING } from '../constants';

import handleLineItemsBreakup from './handleLineItemsBreakup';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;
const FIRST_INDEX = GLOBAL_CONSTANTS.first_index;

function PriceBreakup({ details = {}, source = '' }) {
	const groupedServices = {};

	(details || []).forEach((item) => {
		let service = item?.service_type;
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

	const newData = Object.keys(groupedServices).map((service) => ({
		service: (groupedServices[service] || [])[ZEROTH_INDEX]?.service
			? handleServicesNames(service)
			: startCase(service),

		properties: (groupedServices[service] || []).map((item) => handleLineItemsBreakup(item, source)),
	}));

	return (
		<div className={styles.container}>
			{(newData || []).map((data) => {
				const { properties } = data;

				return properties.map((property, itemIndex) => {
					const { features, price = '' } = property[property.length - FIRST_INDEX] || {};

					return (
						<React.Fragment key={property?.[itemIndex]?.features}>
							<div className={styles.price_title}>
								<div className={styles.basic_details}>
									<div className={styles.basic_title}>{data?.service}</div>
									{features ? (
										<div className={styles.detail_container}>
											(
											{features}
											)
										</div>
									) : null}

								</div>
								<div className={styles.basic_price}>{price}</div>
							</div>

							<div className={styles.info_data}>
								{property.map((item, index) => {
									if (index === property.length - FIRST_INDEX) return null;

									return (
										<div className={styles.info} key={item?.features}>
											<div className={styles.info_text}>{item.features}</div>
											<div className={styles.info_price}>
												{item?.price}
												{' '}
												{UNIT_MAPPING[item?.unit]}
											</div>
										</div>
									);
								})}
							</div>
						</React.Fragment>
					);
				});
			})}
		</div>
	);
}

export default PriceBreakup;
