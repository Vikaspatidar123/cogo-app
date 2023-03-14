import { Pagination } from '@cogoport/components';
import React from 'react';

import CardHeader from './CardHeader';
import EmptyState from './EmptyState';
import Item from './Item';
import styles from './styles.module.css';

function List({
	data,
	config,
	heading,
	loading,
	filters,
	handleClick,
	functions = {},
	setGlobalFilters = () => {},
	showPagination = true,
	getTableHeaderCheckbox,
	drillDown,
	sort,
	setSort,
}) {
	const { list, totalRecords = 0 } = data || {};
	const { pageNo } = filters;
	const { fields, tableView = false, singleList = false } = config ?? {};
	const listNew = loading ? [1, 2, 3, 4, 5] : list;
	const { length = 0 } = listNew || {};

	return (
		<div>
			{listNew?.length > 0 && (
				<CardHeader
					getTableHeaderCheckbox={getTableHeaderCheckbox}
					singleList={singleList}
					fields={fields}
					sort={sort}
					setSort={setSort}
				/>
			)}
			{(listNew || []).map((item, index) => (
				<Item
					tableView={tableView}
					singleList={singleList}
					item={item}
					fields={fields}
					loading={loading}
					handleClick={handleClick}
					functions={functions}
					length={length}
					index={index}
					sort={sort}
				/>
			))}

			{showPagination && listNew?.length > 0 && (
				<div className={`${styles.pagination_div} ${drillDown && 'drillDown'}`}>
					<Pagination
						type="table"
						currentPage={pageNo}
						totalItems={totalRecords}
						pageSize={5}
						onPageChange={(val) => {
							setGlobalFilters((prev) => ({ ...prev, pageNo: val }));
						}}
					/>
				</div>
			)}
			{!loading && !listNew?.length && <EmptyState heading={heading} />}
		</div>
	);
}

export default List;
