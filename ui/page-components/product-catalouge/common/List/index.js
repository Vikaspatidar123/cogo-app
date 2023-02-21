import { Pagination } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

import { useWindowDimensions } from '../MobileView';

import CardHeader from './CardHeader';
import EmptyState from './EmptyState';
import Item from './Item';
// import { Container, PageContainer } from './styles';
import styles from './styles.module.css';

function List({
	data,
	config,
	heading,
	loading,
	handleClick,
	functions = {},
	setPagination = () => {},
	showPagination = true,
	getTableHeaderCheckbox,
	sort,
	setSort,
}) {
	const [isMobile, setIsMobile] = useState(false);
	const { width } = useWindowDimensions();
	useEffect(() => {
		if (width < 1154) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);
	const {
		list = [], pageNo = 0, totalRecords = 0, pageSize = 1,
	} = data || {};
	const { fields, tableView = false, singleList = false } = config ?? {};
	const listNew = loading ? [1, 2, 3, 4, 5] : list;

	return (
		<div className={styles.container}>
			<div className="list">
				{listNew?.length > 0 && !isMobile && (
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
						length={listNew.length}
						index={index}
						key={item.key}
						isMobile={isMobile}
					/>
				))}
			</div>
			{showPagination && listNew?.length > 0 && (
				<div className={styles.page_container}>
					<div className="pagination">
						<Pagination
							className="md"
							type="number"
							currentPage={pageNo}
							totalItems={totalRecords}
							pageSize={5}
							onPageChange={(val) => {
								setPagination((prev) => ({ ...prev, page: val }));
							}}
						/>
					</div>
				</div>
			)}
			{!loading && !listNew?.length && <EmptyState heading={heading} />}
		</div>
	);
}

export default List;
