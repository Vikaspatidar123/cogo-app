import { MultiSelect } from '@cogoport/components';
import { useContext, useState } from 'react';

import sopConditions from '../../../../../../../../../helpers/sop-conditions-options';

import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';

function SopFilters({ setFilters = () => {}, trade_partners_details }) {
	const [{ primary_service }] = useContext(ShipmentDetailContext);

	const conditions = sopConditions(
		primary_service,
		trade_partners_details,
	);
	conditions.push({ label: 'For This Shipment', value: 'for_this_shipment' });
	const [selectValue, setSelectValue] = useState([]);

	return (
		<div>
			<MultiSelect
				placeholder="Filter"
				options={conditions}
				value={selectValue}
				onChange={(val) => {
					setSelectValue(val);
					setFilters(val);
				}}
				multiple
			/>
		</div>
	);
}
export default SopFilters;
