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
	const [showServiceList, setShowServiceList] = useState('');

	const { data = {}, loading = false, refetch = () => {} } = useGetDocumentsList({ filters });

	const { addDocument, loading:addDocumentLoading } = useAddDocuments({
		documentDetails,
		refetch,
		setDocumentDetails,
		serviceType,
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
				refetch={refetch}
				setShowServiceList={setShowServiceList}
				filters={filters}
			/>

			{!showServiceList ? (
				<AllFiles
					filter={filters}
					setFilters={setFilters}
					data={data}
					loading={loading}
				/>
			) : (
				<ServiceUploadDocument
					serviceType={serviceType}
					data={data?.list}
					loading={loading}
					addDocument={addDocument}
					addDocumentLoading={addDocumentLoading}
					refetch={refetch}
				/>
			)}

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
