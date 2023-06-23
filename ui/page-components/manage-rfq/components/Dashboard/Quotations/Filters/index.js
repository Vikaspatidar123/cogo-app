import { Input, Chips } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import { getStatusFilters } from '../../../../configurations/status-filter';

import styles from './styles.module.css';

function Filters({
	activeFilter,
	setActiveFilter,
	setPagination,
	debounceQuery,
	stats,
}) {
	const [value, setValue] = useState('');

	useEffect(() => {
		debounceQuery(value);
	}, [value, debounceQuery]);

	const statusFilter = getStatusFilters({ stats });

	return (
		<div className={styles.container}>
			<Chips
				size="lg"
				items={statusFilter}
				selectedItems={activeFilter}
				onItemChange={(e) => {
					setPagination(1);
					setActiveFilter(e);
				}}
			/>
			<div className={styles.right_corner}>
				<Input
					placeholder="Search RFQ "
					value={value}
					size="xs"
					suffix={<IcMSearchlight />}
					onChange={(e) => {
						setValue(e);
					}}
				/>
			</div>
		</div>
	);
}

export default Filters;
