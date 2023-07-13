import UploadDocument from '../UploadDocument';

import ServiceWiseHeading from './ServiceWiseHeading';
import styles from './styles.module.css';

function Heading({
	setShow = () => {}, documentDetails = {}, addDocument = () => {},
	loading = false, setDocumentDetails = () => {}, setServiceType = () => {}, serviceType = '',
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

			<ServiceWiseHeading setServiceType={setServiceType} serviceType={serviceType} />
		</div>
	);
}

export default Heading;
