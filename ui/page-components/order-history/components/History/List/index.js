import { Pagination } from '@cogoport/components';
import React from 'react';

import CardHeader from './CardHeader';
import EmptyState from './EmptyState';
import Item from './Item';
import styles from './styles.module.css';

function List({
	data = {},
	config = [],
	heading,
	loading = false,
	functions = {},
	setGlobalFilters = () => {},
	showPagination = true,
	sort = '',
	setSort = () => {},

}) {
	const { list = [], pageNo = 0, totalPages } = data || {};

	const listNew = loading ? [1, 2, 3, 4, 5] : list;

	return (
		<div className={styles.container}>
			<div className={styles.header_view}>
				{listNew?.length > 0 && (
					<CardHeader
						fields={config}
						sort={sort}
						setSort={setSort}
					/>
				)}
			</div>
			{(listNew || []).map((item) => (
				<Item
					key={item.id}
					item={item}
					fields={config}
					loading={loading}
					functions={functions}
				/>
			))}

			{showPagination && list?.length > 0 && (
				<div className={styles.pagination_div}>
					<Pagination
						type="number"
						currentPage={pageNo}
						totalItems={totalPages}
						pageSize={5}
						onPageChange={(val) => {
							setGlobalFilters((prev) => ({ ...prev, page: val }));
						}}
					/>
				</div>
			)}
			{!loading && !list?.length && <EmptyState heading={heading} />}
		</div>
	);
}

export default List;
