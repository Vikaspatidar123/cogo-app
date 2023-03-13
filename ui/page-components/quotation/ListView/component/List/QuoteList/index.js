import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import sendListConfig from '../../../configurations/sendList';

import CardHeader from './CardHeader';
import CardRow from './CardRow';
import DeleteModal from './DeleteModal';
import EmptyState from './EmptyState';
import MobileCard from './MobileCard';
import styles from './styles.module.css';

function QuoteList({ data, loading, pagination, setPagination, setSortObj, deleteQuote, deleteLoading }) {
	const [created, setCreated] = useState(false);
	const [expiry, setExpiry] = useState(false);
	const [amount, setAmount] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [quoteId, setQuoteId] = useState();

	const sendConfig = sendListConfig({ created, setCreated, expiry, setExpiry, amount, setAmount });

	const { list = [], totalRecords, pageSize } = data || {};
	const dataList = loading ? [1, 2, 3, 4, 5] : list;
	// console.log(dataList, 'you');
	return (
		<div className={styles.table_container}>
			{dataList.length > 0 && (
				<>
					<div className={styles.desktop_view}>
						<CardHeader config={sendConfig} setSortObj={setSortObj} />
					</div>

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
					<div className={styles.mobile_view}>
						<MobileCard
							data={dataList}
							setShowDeleteModal={setShowDeleteModal}
							setQuoteId={setQuoteId}
						/>
					</div>
					{dataList.length !== 0 && (
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
