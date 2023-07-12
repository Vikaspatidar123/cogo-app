import { Pagination } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import useGetOrderDetails from '../../../../hooks/useGetOrderDetails';

import styles from './styles.module.css';
import TableHeader from './TableHeader';
import TableList from './TableList';

import { useSelector } from '@/packages/store';

const DEFAULT_PAGINATION = 1;
function List({ pendingModal }) {
	const { t } = useTranslation(['subscriptions']);
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const {
		fetchOrderLoading, orderDetails, orderBy, setOrderBy, fetchOrderDetails,
	} = useGetOrderDetails({
		pagination,
	});
	const { order_history, page_limit, total_count } = orderDetails || {};

	useEffect(() => {
		if (!pendingModal) fetchOrderDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination, pendingModal, orderBy]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>{t('subscriptions:current_usage_text')}</div>
			<div className={styles.table_container}>
				<div className={styles.scroll_table}>

					<div className={styles.web_view}>
						<TableHeader setOrderBy={setOrderBy} />
					</div>

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
