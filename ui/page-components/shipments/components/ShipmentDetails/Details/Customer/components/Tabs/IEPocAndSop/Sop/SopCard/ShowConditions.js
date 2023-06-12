import { useContext } from 'react';

import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';

const conditions_keys = [
	'shipper_trade_party_id',
	'consignee_trade_party_id',
	'commodity',
	'origin_country_id',
	'destination_country_id',
	'country_id',
];

function ShowConditions({
	sopData,
	trade_partners_details,
	primary_service_prop = null,
}) {
	let [{ primary_service }] = useContext(ShipmentDetailContext);
	primary_service = primary_service_prop || primary_service;

	const values = {
		shipper_trade_party_id: `Shipper is ${trade_partners_details?.shipper?.name}`,

		consignee_trade_party_id : `Consignee is ${trade_partners_details?.consignee?.name}`,
		commodity                : `Commodity is ${primary_service?.commodity_description}`,
		origin_country_id        : `Origin is ${
			(primary_service?.origin_port || primary_service?.origin_airport)?.country
				?.name
		}`,
		destination_country_id: `Destination is ${
			(
				primary_service?.destination_port
				|| primary_service?.destination_airport
			)?.country?.name
		}`,
		country_id: `Country is ${
			(primary_service?.origin_port || primary_service?.origin_airport)?.country
				?.name
		}`,
	};

	const keys = Object.keys(sopData);
	const conditions = [];

	keys.forEach((key) => {
		if (conditions_keys.includes(key)) {
			if (sopData[key]) {
				conditions.push(values[key]);
			}
		}
	});

	return (
		<>
			{conditions.map((label, index) => (
				<span style={{ fontSize: '12px' }}>
					{`${label}`}
					{' '}
					{index !== conditions.length - 1 ? ', ' : ''}
				</span>
			))}
		</>
	);
}

export default ShowConditions;
