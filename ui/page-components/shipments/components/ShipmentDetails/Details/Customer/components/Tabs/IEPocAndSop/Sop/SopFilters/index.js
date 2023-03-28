// import { Select } from '@cogoport/front/components';
// import { IcMFilter } from '@cogoport/icons-react';

import { MultiSelect } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useContext, useState } from 'react';

import sopConditions from '../../../../../../../../../helpers/sop-conditions-options';

import styles from './styles.module.css';

import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';

function SopFilters({ setFilters = () => {}, trade_partners_details }) {
	const [{ primary_service }] = useContext(ShipmentDetailContext);

	const conditions = sopConditions(
		primary_service,
		trade_partners_details,
	);
	conditions.push({ label: 'For This Shipment', value: 'for_this_shipment' });
	const [selectValue, setSelectValue] = useState('');

	const renderPlaceHolder = (
		<div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
			<IcMFilter />
			<div className={styles.select_placeholder}>Filter</div>
		</div>
	);

	return (
		<div>
			<MultiSelect
				placeholder={<div style={{ color: '#333' }}>{renderPlaceHolder}</div>}
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
