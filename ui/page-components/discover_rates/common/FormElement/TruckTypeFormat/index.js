import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import Item from '../Item';

import TRUCK_TYPES from '@/packages/forms/constants/truck-types.json';

function TruckTypeFormat({
	controlItem, country_code = 'IN', value, ...rest
}) {
	let truckTypes = TRUCK_TYPES.filter(
		(truck) => truck.country_codes.includes(country_code)
			|| truck.country_codes.includes('ALL'),
	);

	const currentObj = truckTypes.find((truck) => truck.value === value) || {
		type: 'open',
	};
	const [truckType, setTruckType] = useState(currentObj.type);

	truckTypes = truckTypes.filter((truck) => truck.type === truckType);
	truckTypes = truckTypes.map((truck) => ({
		...truck,
		children : truck.label,
		key      : truck.value,
	}));
	return (
		<>
			<Toggle
				name="Truck Type"
				size="sm"
				disabled={false}
				onLabel="Closed body"
				offLabel="Open body"
				onChange={(e) => {
					setTruckType(e.target.checked ? 'closed' : 'open');
				}}
			/>
			<Item
				{...controlItem}
				{...rest}
				value={value}
				key={truckType}
				options={truckTypes}
				label="Truck Type"
				className="truck"
			/>
		</>
	);
}

export default TruckTypeFormat;
