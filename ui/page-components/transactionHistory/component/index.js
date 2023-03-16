import { useState } from 'react';

import useTransactionHistory from '../hooks/useTransactionHistory';

import styles from './styles.module.css';
import Transaction from './Transaction';

function TransactionHistory() {
	const [filters, setFilters] = useState({
		pageNo    : 1,
		pageLimit : 10,
	});
	const [sort, setSort] = useState('DESC');
	const { apiResponse, loading } = useTransactionHistory({ filters, sort });
	return (
		<div className={styles.container}>
			<Transaction
				filters={filters}
				realData={apiResponse}
				loading={loading}
				setFilters={setFilters}
				sort={sort}
				setSort={setSort}
			/>
		</div>
	);
}

export default TransactionHistory;
