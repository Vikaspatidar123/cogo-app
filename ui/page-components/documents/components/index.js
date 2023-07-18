import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useAddDocuments from '../hooks/useAddDocuments';
import useGetDocumentsList from '../hooks/useGetDocumentsList';

import AllFiles from './AllFiles';
import Heading from './Heading';
import ServiceUploadDocument from './ServiceUploadDocument';
import Uploader from './Uploader';

function Documents() {
	const [filters, setFilters] = useState({});
	const [show, setShow] = useState(false);
	const [documentDetails, setDocumentDetails] = useState({});
	const [serviceType, setServiceType] = useState('');

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
				setServiceType={setServiceType}
				serviceType={serviceType}
			/>

			{isEmpty(serviceType) ? (
				<AllFiles
					filter={filters}
					setFilters={setFilters}
					data={data}
					loading={loading}
				/>
			) : <ServiceUploadDocument />}

			{show ? (
				<Uploader
					documentDetails={documentDetails}
					setDocumentDetails={setDocumentDetails}
					show={show}
					setShow={setShow}
				/>
			) : null}
		</div>
	);
}

export default Documents;
