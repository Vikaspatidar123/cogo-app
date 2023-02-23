import { Pagination } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React from 'react';

import useFetchActiveTrend from '../../hooks/useActivetrendsDetails';

import styles from './styles.module.css';

function ActiveList({ activePagination, setActivePagination }) {
	const renderDate = (date) => (date ? format(date, 'dd MMM yyyy') : '-');

	const { trackers } = useFetchActiveTrend({ pageLimit: 5 });

	return (
		<div className={styles.container}>
			<div className={styles.title}>Added Rates</div>
			<div className={styles.scroll}>
				{trackers?.list?.map((list) => (
					<div className={styles.details}>
						<div className={styles.group}>
							<div className={styles.label}>Your Rate</div>
							<div className={styles.value}>
								{list?.currency}
								{' '}
								{list?.price?.toFixed(2)}
							</div>
						</div>
						<div className={styles.group}>
							<div className={styles.label}>Savings</div>
							<div className={styles.value}>
								{list?.currency}
								{' '}
								{list?.savings?.toFixed(2)}
							</div>
						</div>
						<div className={styles.group}>
							<div className={styles.label}>Validity</div>
							<div className={styles.value}>
								{renderDate(list?.validity_start)}
								{' - '}
								{renderDate(list?.validity_end)}
							</div>
						</div>
						<div className={styles.group}>
							<div className={styles.label}>Volume (Number of Containers)</div>
							<div className={styles.value}>{list?.volume}</div>
						</div>
					</div>
				))}
			</div>
			<Pagination
				pagination={activePagination}
				setPagination={setActivePagination}
				total={trackers?.total_count}
			/>
		</div>
	);
}
export default ActiveList;
