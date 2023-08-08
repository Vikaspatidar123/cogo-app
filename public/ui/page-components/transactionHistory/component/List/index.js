import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import getListConfig from '../../configurations/listconfig';

import CardHeader from './CardHeader';
import EmptyState from './EmptyState';
import Item from './Item';
import styles from './styles.module.css';

const LOADER_ARR = [...Array(5).keys()];

function List({
	data,
	loading,
	filters,
	setGlobalFilters = () => {},
	sort,
	setSort,
}) {
	const { list = [], totalRecords = 0 } = data || {};
	const { pageNo } = filters;

	const { t } = useTranslation(['transactionHistory']);

	const fields = getListConfig({ t });

	const listNew = loading ? LOADER_ARR : (list || []);

	return (
		<div>
			{!isEmpty(listNew) && (
				<CardHeader
					fields={fields}
					sort={sort}
					setSort={setSort}
				/>
			)}
			{(listNew || []).map((item, index) => (
				<Item
					key={item.id}
					item={item}
					fields={fields}
					loading={loading}
					index={index}
					sort={sort}
				/>
			))}

			{!isEmpty(listNew) && (
				<div className={styles.pagination_div}>
					<Pagination
						type="table"
						currentPage={pageNo}
						totalItems={totalRecords}
						pageSize={10}
						onPageChange={(val) => {
							setGlobalFilters((prev) => ({ ...prev, pageNo: val }));
						}}
					/>
				</div>
			)}
			{!loading && isEmpty(listNew) && <EmptyState />}
		</div>
	);
}

export default List;
