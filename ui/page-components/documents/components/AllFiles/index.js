import { Table, Pagination } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getColumns from '../../config';
import Filters from '../Filters';

import styles from './styles.module.css';

const LOADING_ROWS_COUNT = 6;

function AllFiles({ data = {}, loading = false, filters = {}, setFilters = () => {} }) {
	const { page = 1 } = filters || {};
	const { total_count = 0, list = [] } = data || {};

	const { t } = useTranslation(['documents']);
	const columns = getColumns({ t });

	return (
		<div>
			<Filters setFilters={setFilters} filters={filters} />

			<div className={styles.table_wrapper}>
				<Table
					columns={columns || []}
					data={list || []}
					loading={loading}
					loadingRowsCount={LOADING_ROWS_COUNT}
					className={styles.table}
				/>
			</div>
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
