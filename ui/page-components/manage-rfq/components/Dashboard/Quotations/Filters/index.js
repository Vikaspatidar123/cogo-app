import { Input, Chips } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import statusFilter from '../../../../configurations/status-filter';

import styles from './styles.module.css';

function Filters({
	activeFilter,
	setActiveFilter,
	setPagination,
	debounceQuery,
}) {
	const [value, setValue] = useState('');

	useEffect(() => {
		debounceQuery(value);
	}, [value, debounceQuery]);

	return (
		<div className={styles.container}>
			<Chips
				size="md"
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
