import { Table, Pagination } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getColumns from '../config';
import useAddDocuments from '../hooks/useAddDocuments';
import useGetDocumentsList from '../hooks/useGetDocumentsList';

import Filters from './Filters';
import Heading from './Heading';
import styles from './styles.module.css';
import Uploader from './Uploader';

const LOADING_ROWS_COUNT = 6;

function Documents() {
	const { t } = useTranslation(['documents']);

	const [filters, setFilters] = useState({ page: 1 });

	const [show, setShow] = useState(false);

	const [documentDetails, setDocumentDetails] = useState({});

	const { page = 1 } = filters || {};

	const { data = {}, loading = false, refetch = () => {} } = useGetDocumentsList({ filters });

	const { total_count = 0, list = [] } = data || {};

	const columns = getColumns({ t });

	const { addDocument, loading:addDocumentLoading } = useAddDocuments({
		documentDetails,
		refetch,
		setDocumentDetails,
	});

	return (
		<div>
			<Heading
				setShow={setShow}
				documentDetails={documentDetails}
				addDocument={addDocument}
				loading={addDocumentLoading}
				setDocumentDetails={setDocumentDetails}
			/>
			<Filters setFilters={setFilters} filters={filters} />
			<div className={styles.table_wrapper}>
				<Table
					columns={columns || []}
					data={list || []}
					loading={loading}
					loadingRowsCount={LOADING_ROWS_COUNT}
					className={styles.table}
				/>
			</div>
			<div className={styles.pagination_wrapper}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={10}
					onPageChange={(e) => {
						setFilters((prev) => ({
							...prev,
							page: e,
						}));
					}}
				/>
			</div>

			{show && (
				<Uploader
					documentDetails={documentDetails}
					setDocumentDetails={setDocumentDetails}
					show={show}
					setShow={setShow}
				/>
			)}
		</div>
	);
}

export default Documents;
