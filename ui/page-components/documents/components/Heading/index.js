import UploadDocument from '../UploadDocument';

import ServiceWiseHeading from './ServiceWiseHeading';
import styles from './styles.module.css';

function Heading({
	setShow = () => {},
	documentDetails = {},
	addDocument = () => {},
	refetch = () => {},
	loading = false,
	setDocumentDetails = () => {},
	setServiceType = () => {},
	serviceType = '',
	setShowServiceList = () => {},
	filters = {},
}) {
	return (
		<div className={styles.header}>
			<div className={styles.title}>Quick Upload a Document</div>

			<UploadDocument
				setShow={setShow}
				documentDetails={documentDetails}
				addDocument={addDocument}
				loading={loading}
				setDocumentDetails={setDocumentDetails}
			/>

			<ServiceWiseHeading
				setServiceType={setServiceType}
				serviceType={serviceType}
				refetch={refetch}
				setShowServiceList={setShowServiceList}
				filters={filters}
			/>
		</div>
	);
}

export default Heading;
