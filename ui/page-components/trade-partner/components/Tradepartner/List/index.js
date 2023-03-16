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
	handleClick,
	functions = {},
	setGlobalFilters = () => {},
	showPagination = true,
	sort,
	setSort,
	deleteTradeParty,
	deleteLoading,
	setShowModal = () => {},
	setTradePartyDetails = () => {},
	setIsEdit = () => {},
	deleteModal,
	setDeleteModal = () => {},
	archived,
	getList,
	showmodal,
}) {
	const { list, pageNo = 0, totalRecords } = data || {};
	const { fields, tableView = false, singleList = false } = config ?? {};
	const listNew = loading ? [1, 2, 3, 4, 5] : list;
	const { length = 0 } = listNew || {};

	return (
		<div>
			<div className={styles.view_header}>
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
					key={item.title}
					tableView={tableView}
					singleList={singleList}
					item={item}
					fields={fields}
					loading={loading}
					handleClick={handleClick}
					functions={functions}
					length={length}
					index={index}
					deleteTradeParty={deleteTradeParty}
					deleteLoading={deleteLoading}
					setShowModal={setShowModal}
					setTradePartyDetails={setTradePartyDetails}
					setIsEdit={setIsEdit}
					deleteModal={deleteModal}
					setDeleteModal={setDeleteModal}
					archived={archived}
					getList={getList}
					showmodal={showmodal}
				/>
			))}

			{showPagination && listNew?.length > 0 && (
				<div className={styles.pagination_div}>
					<Pagination
						type="number"
						currentPage={pageNo}
						totalItems={totalRecords}
						pageSize={10}
						onPageChange={(val) => {
							setGlobalFilters((prev) => ({ ...prev, page: val }));
						}}
					/>
				</div>
			)}
			{!loading && !listNew?.length && <EmptyState heading={heading} />}
		</div>
	);
}

export default List;
