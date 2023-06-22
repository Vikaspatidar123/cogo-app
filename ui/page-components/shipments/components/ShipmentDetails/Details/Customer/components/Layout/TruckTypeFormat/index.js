import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import TRUCK_TYPES from '../../../../../../../constants/truck-types.json';
import Item from '../Item';

function TruckTypeFormat({
	controlItem, control, value, id_prefix, themeType, formValues,
	country_code = 'IN',
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
				size="md"
				disabled={false}
				onLabel="Closed body"
				offLabel="Open body"
				onChange={(e) => {
					setTruckType(e.target.checked ? 'closed' : 'open');
				}}
			/>
			<Item
				{...controlItem}
				key={truckType}
				control={control}
				value={controlItem.value}
				id_prefix={id_prefix}
				themeType={themeType}
				formValues={formValues}
				options={truckTypes}
				label="Truck Type"
				className="truck"
			/>
		</>
	);
}

export default TruckTypeFormat;
