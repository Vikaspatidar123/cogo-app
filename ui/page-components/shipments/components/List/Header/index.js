// import SearchInput from '@cogo/commons/components/SearchInput';
// import { FilterButton } from '@cogo/deprecated_legacy/filters';
// import { shape, func, string } from 'prop-types';
// import React from 'react';

import { Input } from '@cogoport/components';

import styles from './styles.module.css';
// import { Container, Title, Right } from './styles';

function Header({ filters, hookSetters, config, setParams, viewAs }) {
	const { serial_id, ...restFilters } = filters || {};

	// const renderFilters = (
	// 	<FilterButton
	// 		filters={restFilters}
	// 		setFilters={(val) => {
	// 			hookSetters.setFilters({
	// 				...(val || {}),
	// 				serial_id : serial_id || undefined,
	// 				page      : 1,
	// 			});
	// 		}}
	// 		isScrollable={(config.filter_controls || []).length > 5}
	// 		controls={config.filter_controls}
	// 		dynamicKey={
	// 			viewAs === 'importer_exporter' ? 'shipment_type' : 'service_type'
	// 		}
	// 	/>
	// );

	return (
		<div className={styles.container} style={{ marginBottom: 40, marginLeft: 15 }}>
			<h2>Shipments</h2>
			<div className={styles.right}>
				{/* <Sort setSort={setParams} sortBy={filters.sortBy} /> */}
				<Input
					size="md"
					style={{ marginRight: 10 }}
					onChange={(e) => {
						hookSetters.setFilters({
							...filters,
							serial_id: e.target.value,
						});
					}}
					value={serial_id}
					placeholder="Shipment ID"
					className={styles.input}
				/>
				{/* Filters */}
				{/* {renderFilters} */}
			</div>
		</div>
	);
}

export default Header;
