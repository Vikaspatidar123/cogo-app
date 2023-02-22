import { useState, useEffect } from 'react';

import { useWindowDimensions } from '../common/isMobile';
import useTransactionHistory from '../hooks/useTransactionHistory';

import styles from './styles.module.css';
import Transaction from './Transaction';

function TransactionHistory() {
	const [isMobile, setIsMobile] = useState(false);

	const { width } = useWindowDimensions();
	useEffect(() => {
		if (width < 1154) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);

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
				isMobile={isMobile}
			/>
		</div>
	);
}

export default TransactionHistory;
