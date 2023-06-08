import { Pagination } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useGetOrderDetails from '../../../../hooks/useGetOrderDetails';

import styles from './styles.module.css';
import TableHeader from './TableHeader';
import TableList from './TableList';

import { useSelector } from '@/packages/store';

function List({ pendingModal }) {
	const [pagination, setPagination] = useState(1);

	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const {
		fetchOrderLoading, orderDetails, orderBy, setOrderBy, fetchOrderDetails,
	} =	useGetOrderDetails({
		pagination,
	});
	const { order_history, page_limit, total_count } = orderDetails || {};

	useEffect(() => {
		if (!pendingModal) fetchOrderDetails();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination, pendingModal, orderBy]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Current Usage</div>
			<div className={styles.table_container}>
				<div className={styles.scroll_table}>
					{!isMobile && <TableHeader setOrderBy={setOrderBy} />}
					<TableList
						list={order_history}
						loading={fetchOrderLoading}
						isMobile={isMobile}
					/>
				</div>
				<div className={styles.pagination}>
					<Pagination
						type="number"
						currentPage={pagination}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setPagination}
					/>
				</div>
			</div>
		</div>
	);
}

export default List;
