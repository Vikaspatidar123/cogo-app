import { Pagination } from '@cogoport/components';

import CardHeader from './CardHeader';
import EmptyState from './EmptyState';
import Item from './Item';
import MobileCard from './MobileCard';
import styles from './styles.module.css';

function List({
	data,
	config,
	loading,
	functions = {},
	setGlobalFilters = () => {},
	showPagination = true,
	sort,
	setSort,
	isMobile,
}) {
	const { list, pageNo = 0, totalRecords = 0 } = data || {};
	const { fields, tableView = false, singleList = false } = config ?? {};
	const listNew = loading ? [1, 2, 3, 4, 5] : list;
	const { length = 0 } = listNew || {};

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{listNew?.length > 0 && !isMobile && (
					<CardHeader
						singleList={singleList}
						fields={fields}
						sort={sort}
						setSort={setSort}
					/>
				)}
				{!isMobile
					&& (listNew || []).map((item, index) => (
						<Item
							tableView={tableView}
							singleList={singleList}
							item={item}
							fields={fields}
							loading={loading}
							functions={functions}
							length={length}
							index={index}
							key={item.key}
							isMobile={isMobile}
						/>
					))}
				{isMobile
					&& (listNew || []).map((item, index) => (
						<MobileCard
							tableView={tableView}
							singleList={singleList}
							item={item}
							fields={fields}
							loading={loading}
							functions={functions}
							length={length}
							index={index}
							key={item.key}
							isMobile={isMobile}
						/>
					))}
			</div>
			{showPagination && listNew?.length > 0 && (
				<div className={styles.pagination_div}>
					<Pagination
						type="table"
						pageSize={10}
						pageLimit={10}
						totalItems={totalRecords}
						currentPage={pageNo}
						onPageChange={(val) => {
							setGlobalFilters((prev) => ({ ...prev, page: val }));
						}}
					/>
				</div>
			)}
			{!loading && !listNew?.length && <EmptyState />}
		</div>
	);
}

export default List;
