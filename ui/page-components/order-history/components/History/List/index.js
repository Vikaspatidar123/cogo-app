import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import DetailsModal from '../../../common/DetailsModal';

import CardHeader from './CardHeader';
import EmptyState from './EmptyState';
import Item from './Item';
import styles from './styles.module.css';

const LOADING_ARR = [...new Array(5).keys()];

function List({
	data = {},
	config = [],
	loading = false,
	setGlobalFilters = () => {},
	sort = '',
	setSort = () => {},

}) {
	const { list = [], pageNo = 0, totalPages } = data || {};

	const [detailsModal, setDetailsModal] = useState({
		show: false,
	});

	const listNew = loading ? LOADING_ARR : list;

	return (
		<div className={styles.container}>
			<div className={styles.header_view}>
				{!isEmpty(listNew) ? (
					<CardHeader
						fields={config}
						sort={sort}
						setSort={setSort}
					/>
				) : null}
			</div>
			{(listNew || []).map((item) => (
				<Item
					key={item.id}
					item={item}
					fields={config}
					loading={loading}
					setDetailsModal={setDetailsModal}
				/>
			))}

			{!isEmpty(list) && (
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
			{(!loading && isEmpty(list)) ? <EmptyState /> : null}
			{detailsModal.show ? <DetailsModal detailsModal={detailsModal} setDetailsModal={setDetailsModal} /> : null}
		</div>
	);
}

export default List;
