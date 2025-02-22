import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import sendListConfig from '../../../configurations/sendList';

import CardHeader from './CardHeader';
import CardRow from './CardRow';
import DeleteModal from './DeleteModal';
import EmptyState from './EmptyState';
import MobileCard from './MobileCard';
import styles from './styles.module.css';

function QuoteList({
	data, loading, deleteQuote, deleteLoading, setGlobalFilter,
}) {
	const [created, setCreated] = useState(false);
	const [expiry, setExpiry] = useState(false);
	const [amount, setAmount] = useState(false);

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [quoteId, setQuoteId] = useState();

	const sendConfig = sendListConfig({ created, setCreated, expiry, setExpiry, amount, setAmount });

	const { list = [], totalRecords, pageSize = 0, pageNo } = data || {};
	const dataList = loading ? [1, 2, 3, 4, 5] : list;

	const pageChangeHandler = (page) => {
		setGlobalFilter((prev) => ({
			...prev,
			page,
		}));
	};
	return (
		<div className={styles.table_container}>
			{dataList.length > 0 && (
				<>
					<div className={styles.desktop_view}>
						<CardHeader config={sendConfig} setGlobalFilter={setGlobalFilter} />

						{(dataList || []).map((listItem) => (
							<CardRow
								key={listItem?.quotationId}
								data={listItem}
								config={sendConfig}
								loading={loading}
								deleteQuote={deleteQuote}
								setShowDeleteModal={setShowDeleteModal}
								setQuoteId={setQuoteId}
							/>
						))}
					</div>
					<div className={styles.mobile_view}>
						<MobileCard
							data={dataList}
							setShowDeleteModal={setShowDeleteModal}
							setQuoteId={setQuoteId}
							loading={loading}
						/>
					</div>
					{dataList.length !== 0 && (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={pageNo}
								totalItems={totalRecords}
								pageSize={pageSize}
								onPageChange={pageChangeHandler}
							/>
						</div>
					)}
				</>
			)}
			{dataList.length === 0 && <EmptyState text="No data Found" />}
			<DeleteModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				quoteId={quoteId}
				deleteQuote={deleteQuote}
				deleteLoading={deleteLoading}
			/>
		</div>
	);
}

export default QuoteList;
