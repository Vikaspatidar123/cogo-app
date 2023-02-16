import Pagination from '@cogoport/front/components/admin/Pagination';
import React, { useEffect, useState } from 'react';

import { useWindowDimensions } from '../MobileView';

import CardHeader from './CardHeader';
import EmptyState from './EmptyState';
import Item from './Item';
import { Container, PageContainer } from './styles';

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
		<Container>
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
				<PageContainer>
					<div className="pagination">
						<Pagination
							className="xl"
							pageRange={5}
							pageLimit={pageSize}
							total={totalRecords}
							pagination={pageNo}
							isMobile={isMobile}
							setPagination={(val) => {
								setPagination((prev) => ({ ...prev, page: val }));
							}}
						/>
					</div>
				</PageContainer>
			)}
			{!loading && !listNew?.length && <EmptyState heading={heading} />}
		</Container>
	);
}

export default List;
