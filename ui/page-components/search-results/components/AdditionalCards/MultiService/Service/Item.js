import startCase from '@cogo/utils/startCase';
import { ToolTip } from '@cogoport/front/components';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { serviceConfigurations } from '../../../../helpers/configurations';
import { Value, FlexRow } from './styles';

const operatorKeys = [
	'preferred_shipping_line_ids',
	'non_preferred_shipping_line_ids',
	'preferred_airlines',
	'preferred_shipping_lines',
	'non_preferred_shipping_lines',
	'preferred_airline_ids',
];

const packageContent = (joinArr) => {
	return joinArr.map((str) => <div style={{ fontSize: '10px' }}>{str}</div>);
};

const operatorNames = (operatorArr) => {
	return operatorArr.map((val) => (
		<div style={{ fontSize: '10px' }}>{val.business_name}</div>
	));
};

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
						<FlexRow>
							<Value className="heading">{startCase(heading)}</Value>
							<Value>{serviceObj[key]?.display_name}</Value>
						</FlexRow>,
					);
				}
			} else if (key === 'preferred_freight_rate') {
				finalObjArr.push(
					<FlexRow>
						<Value className="heading">Preferred Rate</Value>
						<Value>{`${serviceObj?.preferred_freight_rate_currency} ${
							serviceObj?.preferred_freight_rate || 0
						}`}</Value>
					</FlexRow>,
				);
			} else if (key === 'cargo_value') {
				if (serviceObj?.cargo_value_currency && serviceObj?.cargo_value) {
					finalObjArr.push(
						<FlexRow>
							<Value className="heading">Cargo Value</Value>
							<Value>{`${serviceObj?.cargo_value_currency} ${serviceObj?.cargo_value}`}</Value>
						</FlexRow>,
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
					<FlexRow>
						<Value className="heading">Packages</Value>

						<Value>
							<div>{joinArr[0]}</div>
							{joinArr.length > 1 ? (
								<ToolTip
									placement="bottom"
									content={packageContent(joinArr)}
									theme="light"
								>
									<div style={{ fontSize: '10px' }}>{`  (+ ${
										joinArr?.length - 1
									} More)`}</div>
								</ToolTip>
							) : null}
						</Value>
					</FlexRow>,
				);
			} else if (
				((serviceConfigurations[serviceType] || []).includes(key) ||
					(serviceConfigurations[serviceType] || []).includes(
						key.split('_ids')[0],
					)) &&
				(serviceObj[key]?.length ||
					typeof serviceObj[key] === 'number' ||
					serviceObj[key] instanceof Date)
			) {
				if (operatorKeys.includes(key)) {
					const operatorArr = serviceObj[key];
					finalObjArr.push(
						<FlexRow>
							<Value className="heading">{startCase(key)}</Value>
							<Value>
								<div>{operatorArr?.[0].business_name}</div>
								{operatorArr.length > 1 ? (
									<ToolTip
										placement="bottom"
										content={operatorNames(operatorArr)}
										theme="light"
									>
										<div style={{ fontSize: '10px' }}>{`  (+ ${
											operatorArr?.length - 1
										} More)`}</div>
									</ToolTip>
								) : null}
							</Value>
						</FlexRow>,
					);
				} else {
					let display_data = '';
					if (key.includes('date')) {
						const date = new Date(serviceObj[key]);
						display_data = formatDate({
							date,
							dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType: 'date',
						});
					} else {
						display_data = serviceObj[key];
					}

					finalObjArr.push(
						<FlexRow>
							<Value className="heading">{startCase(key)}</Value>
							<Value>{startCase(display_data)}</Value>
						</FlexRow>,
					);
				}
			}
		});
	});

	return finalObjArr;
};
