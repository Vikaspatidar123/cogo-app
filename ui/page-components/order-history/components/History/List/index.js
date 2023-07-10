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
	const { fields, tableView = false, singleList = false } = config || {};
	const listNew = loading ? [1, 2, 3, 4, 5] : list;
	const { length = 0 } = listNew || {};

	return (
		<div className={styles.container}>
			<div className={styles.header_view}>
				{listNew?.length > 0 && (
					<CardHeader
						singleList={singleList}
						fields={fields}
						sort={sort}
						setSort={setSort}
					/>
				)}
			</div>
			{(listNew || []).map((item, index) => (
				<Item
					key={item.id}
					tableView={tableView}
					singleList={singleList}
					item={item}
					fields={fields}
					loading={loading}
					functions={functions}
					length={length}
					index={index}
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
