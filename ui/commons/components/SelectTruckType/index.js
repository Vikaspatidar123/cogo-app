// import { Select2 } from '@cogo/deprecated_legacy/ui';
// import startCase from '@cogo/utils/startCase';
// import { string, oneOfType, arrayOf } from 'prop-types';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

// import TRUCK_TYPES from '../../constants/truck-types.json';
// import SwitchSelect from '../SwitchSelect';
import TRUCK_TYPES from '../../../page-components/shipments/constants/truck-types.json';

function SelectTruckTypes({ selectType, value, country_code, ...rest }) {
	let truckTypes = TRUCK_TYPES.filter(
		(truck) => truck.country_codes.includes(country_code)
			|| truck.country_codes.includes('ALL'),
	);
	const currentObj = truckTypes.find((truck) => truck.value === value) || {
		type: 'open',
	};
	const [truckType, setTruckType] = useState(currentObj.type);

	if (selectType === 'pills') {
		truckTypes = truckTypes.filter((truck) => truck.type === truckType);
	} else {
		truckTypes = truckTypes.map((truck) => ({
			...truck,
			label: `${startCase(truck.type)} Body ${truck.label}`,
		}));
	}

	if (selectType === 'pills') {
		const switchProps = {
			right: {
				title : 'Open body',
				value : 'open',
			},
			left: {
				title : 'Closed body',
				value : 'closed',
			},
			onChange : setTruckType,
			active   : truckType,
		};

		return (
			<SwitchSelect label="Truck Type" switchProps={switchProps}>
				<Select2
					name="truck_type"
					selectType={selectType}
					{...rest}
					value={value}
					options={truckTypes}
				/>
			</SwitchSelect>
		);
	}

	return (
		<Select2
			name="truck_type"
			{...rest}
			options={truckTypes}
			value={value}
			caret
		/>
	);
}

export default SelectTruckTypes;
