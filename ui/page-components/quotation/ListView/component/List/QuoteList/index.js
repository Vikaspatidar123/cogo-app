import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import sendListConfig from '../../../configurations/sendList';

import CardHeader from './CardHeader';
import CardRow from './CardRow';
import EmptyState from './EmptyState';
import styles from './styles.module.css';

function QuoteList({ data, loading, pagination, setPagination, setSortObj }) {
	const [created, setCreated] = useState(false);
	const [expiry, setExpiry] = useState(false);
	const [amount, setAmount] = useState(false);

	const sendConfig = sendListConfig({ created, setCreated, expiry, setExpiry, amount, setAmount });

	const { list = [], totalRecords, pageSize } = data || {};
	const dataList = loading ? [1, 2, 3, 4, 5] : list;

	return (
		<div className={styles.table_container}>
			{dataList.length > 0 && (
				<>
					<CardHeader config={sendConfig} setSortObj={setSortObj} />
					{(dataList || []).map((listItem) => (
						<CardRow key={listItem?.quotationId} data={listItem} config={sendConfig} loading={loading} />
					))}
					{dataList.length >= 10 && (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={pagination}
								totalItems={totalRecords}
								pageSize={pageSize}
								onPageChange={setPagination}
							/>
						</div>
					)}
				</>
			)}
			{dataList.length === 0 && <EmptyState text="No data Found" />}
		</div>
	);
}

export default QuoteList;
