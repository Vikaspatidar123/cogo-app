import { Table, Pagination } from '@cogoport/components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import columns from '../config';
import useAddDocuments from '../hooks/useAddDocuments';
import useGetDocumentsList from '../hooks/useGetDocumentsList';

import Filters from './Filters';
import Heading from './Heading';
import styles from './styles.module.css';
import Uploader from './Uploader';

function Documents() {
	const [filters, setFilters] = useState({});
	const [show, setShow] = useState(false);
	const [documentDetails, setDocumentDetails] = useState({});

	const { general:{ isMobile } } = useSelector((state) => state);

	const { page = 1 } = filters || {};

	const { data = {}, loading = false, refetch = () => {} } = useGetDocumentsList({ filters });

	const { total_count = 0, list = [] } = data || {};

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
				isMobile={isMobile}
			/>
			<Filters setFilters={setFilters} filters={filters} isMobile={isMobile} />
			<Table
				columns={columns || []}
				data={list}
				loading={loading}
				loadingRowsCount={6}
				className={styles.table}
			/>
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
