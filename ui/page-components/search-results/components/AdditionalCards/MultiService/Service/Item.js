import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { serviceConfigurations } from './configurations';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const operatorKeys = [
	'preferred_shipping_line_ids',
	'non_preferred_shipping_line_ids',
	'preferred_airlines',
	'preferred_shipping_lines',
	'non_preferred_shipping_lines',
	'preferred_airline_ids',
];

const packageContent = (joinArr) => joinArr.map((str) => <div style={{ fontSize: '10px' }}>{str}</div>);

const operatorNames = (operatorArr) => operatorArr.map((val) => (
	<div style={{ fontSize: '10px' }}>{val.business_name}</div>
));

export const renderItem = (servicesObjectArr, service_type) => {
	const finalObjArr = [];

	(servicesObjectArr || []).forEach((obj) => {
		const serviceObj = obj;
		const serviceType = serviceObj?.service_name || service_type;

		Object.keys(serviceObj || {}).forEach((key) => {
			if (
				[
					'origin_location_id',
					'destination_location_id',
					'origin_location',
					'destination_location',
				].includes(key)
			) {
				let heading = key;
				if (key.includes('id')) {
					heading = key.split('_id')?.[0];
				}

				if (serviceObj[key]?.name) {
					finalObjArr.push(
						<div className={styles.flex_row}>
							<div className={`${styles.value} ${styles.heading}`}>{startCase(heading)}</div>
							<div className={styles.value}>{serviceObj[key]?.display_name}</div>
						</div>,
					);
				}
			} else if (key === 'preferred_freight_rate') {
				finalObjArr.push(
					<div className={styles.flex_row}>
						<div className={`${styles.value} ${styles.heading}`}>Preferred Rate</div>
						<div className={styles.value}>
							{`${serviceObj?.preferred_freight_rate_currency} ${
								serviceObj?.preferred_freight_rate || 0
							}`}
						</div>
					</div>,
				);
			} else if (key === 'cargo_value') {
				if (serviceObj?.cargo_value_currency && serviceObj?.cargo_value) {
					finalObjArr.push(
						<div className={styles.flex_row}>
							<div className={`${styles.value} ${styles.heading}`}>Cargo Value</div>

							<div className={styles.value}>
								{`${serviceObj?.cargo_value_currency} ${serviceObj?.cargo_value}`}
							</div>
						</div>,
					);
				}
			} else if (key === 'packages') {
				const joinArr = [];
				(serviceObj[key] || []).forEach((valObj) => {
					const detailsArr = [];

					const valueObj = `${valObj?.packages_count} Pkg, 
						${startCase(valObj?.packing_type)}`;

					detailsArr.push(valueObj);
					const tempString = detailsArr.join(', ');
					joinArr.push(tempString);
				});

				finalObjArr.push(
					<div className={styles.flex_row}>
						<div className={`${styles.value} ${styles.heading}`}>Packages</div>

						<div className={styles.value}>
							<div>{joinArr[0]}</div>
							{joinArr.length > 1 ? (
								<Tooltip
									placement="bottom"
									content={packageContent(joinArr)}
									theme="light"
								>
									<div style={{ fontSize: '10px' }}>
										{`  (+ ${
											joinArr?.length - 1
										} More)`}
									</div>
								</Tooltip>
							) : null}
						</div>
					</div>,
				);
			} else if (
				((serviceConfigurations[serviceType] || []).includes(key)
					|| (serviceConfigurations[serviceType] || []).includes(
						key.split('_ids')[0],
					))
				&& (serviceObj[key]?.length
					|| typeof serviceObj[key] === 'number'
					|| serviceObj[key] instanceof Date)
			) {
				if (operatorKeys.includes(key)) {
					const operatorArr = serviceObj[key];
					finalObjArr.push(
						<div className={styles.flex_row}>
							<div className={`${styles.value} ${styles.heading}`}>{startCase(key)}</div>
							<div className={styles.value}>
								<div>{operatorArr?.[0].business_name}</div>
								{operatorArr.length > 1 ? (
									<Tooltip
										placement="bottom"
										content={operatorNames(operatorArr)}
										theme="light"
									>
										<div style={{ fontSize: '10px' }}>
											{`  (+ ${
												operatorArr?.length - 1
											} More)`}
										</div>
									</Tooltip>
								) : null}
							</div>
						</div>,
					);
				} else {
					let display_data = '';
					if (key.includes('date')) {
						const date = new Date(serviceObj[key]);
						display_data = formatDate({
							date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						});
					} else {
						display_data = serviceObj[key];
					}

					finalObjArr.push(
						<div className={styles.flex_row}>
							<div className={`${styles.value} ${styles.heading}`}>{startCase(key)}</div>
							<div className={styles.value}>{startCase(display_data)}</div>
						</div>,
					);
				}
			}
		});
	});

	return finalObjArr;
};
