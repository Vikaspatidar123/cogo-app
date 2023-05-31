import { Input, Select } from '@cogoport/components';
import { IcMCross, IcMFilter, IcMSearchlight } from '@cogoport/icons-react';

import { options } from '../../constants/documentTypeOptions';

import styles from './styles.module.css';

function Filters({ setFilters = () => {}, filters = {} }) {
	const { documentTypeFilter = '' } = filters || {};

	const clearFilters = () => {
		setFilters((prev) => ({
			...prev,
			documentTypeFilter: null,
		}));
	};

	return (
		<div className={styles.filters_wrapper}>
			<div className={styles.table_title}>
				All Files
			</div>

			<div className={styles.search}>
				<div className={styles.select_container}>
					<Select
						options={options}
						size="sm"
						onChange={(e) => {
							setFilters((prev) => ({
								...prev,
								documentTypeFilter: e,
							}));
						}}
						value={documentTypeFilter}
						placeholder="Select"
						prefix={<IcMFilter />}
						suffix={documentTypeFilter ? <IcMCross onClick={clearFilters} /> : ''}
					/>
				</div>
				<div className={styles.input}>
					<Input
						placeholder="Search by document name"
						size="sm"
						prefix={<IcMSearchlight />}
						onChange={(e) => setFilters((prev) => ({ ...prev, query: e }))}
					/>
				</div>
			</div>
		</div>
	);
}

export default Filters;
