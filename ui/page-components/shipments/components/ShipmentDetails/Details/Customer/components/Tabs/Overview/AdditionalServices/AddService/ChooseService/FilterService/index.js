import { Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function FilterService({ setFilters, filters, uniqueServices }) {
	return (
		<div className={styles.container}>
			<Select
				size="sm"
				value={filters?.service_type}
				onChange={(e) => setFilters({ service_type: e })}
				placeholder="Choose service"
				isClearable
				options={uniqueServices || []}
				style={{ width: '210px' }}
			/>

			<Input
				size="sm"
				value={filters.name}
				style={{ width: '300px' }}
				placeholder="Search service by name"
				onChange={(e) => setFilters({ name: e })}
				suffix={<IcMSearchlight style={{ marginRight: '10px' }} />}
			/>
		</div>
	);
}

export default FilterService;
