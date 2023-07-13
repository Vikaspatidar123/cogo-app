import { Table, Pagination } from '@cogoport/components';

import columns from '../../config';
import Filters from '../Filters';

import styles from './styles.module.css';

function AllFiles({ data = {}, loading = false, filters = {}, setFilters = () => {} }) {
	const { page = 1 } = filters || {};

	const { total_count = 0, list = [] } = data || {};

	return (
		<div>
			<Filters setFilters={setFilters} filters={filters} />

			<Table
				columns={columns || []}
				data={list || []}
				loading={loading}
				loadingRowsCount={6}
				className={styles.table}
			/>

			<div className={styles.pagination_wrapper}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={10}
					onPageChange={(e) => {
						setFilters((prev) => ({
							...prev,
							page: e,
						}));
					}}
				/>
			</div>
		</div>
	);
}

export default AllFiles;
