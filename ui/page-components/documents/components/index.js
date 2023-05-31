import { Table } from '@cogoport/components';
import { useState } from 'react';

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

	const { data = {}, loading = false, refetch = () => {} } = useGetDocumentsList({ filters });

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
			<Table
				columns={columns}
				data={!loading ? data?.list : []}
				loading={loading}
				loadingRowsCount={6}
				className={styles.table}
			/>
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
