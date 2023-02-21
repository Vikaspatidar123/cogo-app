import { Table, Pagination } from '@cogoport/components';
import React from 'react';

import columns from './Column';
import EmptyState from './EmptyState';
import styles from './styles.module.css';

function List({
	data = {},
	heading,
	loading = false,
	setGlobalFilters = () => {},
	showPagination = true,
	sort = '',
	setSort = () => {},
	isMobile = false,
}) {
	const {
		list = [], pageNo = 0, totalPages,
	} = data || {};

	const column = columns({ loading, sort, setSort });

	return (
		<div className={styles.container}>
			<Table
				className={styles.table_container}
				columns={column}
				data={list}
				loading={loading}
			/>

			{showPagination && list?.length > 0 && (
				<div className={styles.pagination_div}>
					<Pagination
						type="table"
						currentPage={pageNo}
						totalItems={totalPages}
						pageSize={5}
						isMobile={isMobile}
						onPageChange={(val) => {
							setGlobalFilters((prev) => ({ ...prev, pageNo: val }));
						}}
					/>
				</div>
			)}
			{!loading && !list?.length && <EmptyState heading={heading} />}
		</div>
	);
}

export default List;
