import { Pagination } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useGetOrderDetails from '../../../../hooks/useGetOrderDetails';

import styles from './styles.module.css';
import TableHeader from './TableHeader';
import TableList from './TableList';

function List({ pendingModal }) {
	const { t } = useTranslation(['subscriptions']);

	const {
		fetchOrderLoading,
		orderDetails,
		setOrderBy,
		pagination,
		setPagination,
	} = useGetOrderDetails({
		pendingModal,
	});
	const { order_history, page_limit, total_count } = orderDetails || {};

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
