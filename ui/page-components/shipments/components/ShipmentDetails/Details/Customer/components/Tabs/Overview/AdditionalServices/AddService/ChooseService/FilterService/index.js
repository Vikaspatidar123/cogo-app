import { Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function FilterService({ setFilters, filters, uniqueServices }) {
	return (
		<div className={styles.container}>
			<Select
				className="primary sm"
				value={filters?.service_type}
				onChange={(e) => setFilters({ service_type: e })}
				placeholder="Choose service"
				isClearable
				options={uniqueServices || []}
			/>

			<Input
				className="primary sm"
				value={filters.name}
				style={{ width: '300px' }}
				placeholder="Search service by name"
				onChange={(e) => setFilters({ name: e })}
				suffix={<IcMSearchlight />}
			/>
		</div>
	);
}

export default FilterService;
