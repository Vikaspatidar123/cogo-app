import UploadDocument from '../UploadDocument';

import styles from './styles.module.css';

function Heading({
	setShow = () => {}, documentDetails = {}, addDocument = () => {},
	loading = false, setDocumentDetails = () => {},
}) {
	return (
		<div className={styles.header}>
			<UploadDocument
				setShow={setShow}
				documentDetails={documentDetails}
				addDocument={addDocument}
				loading={loading}
				setDocumentDetails={setDocumentDetails}
			/>
		</div>
	);
}

export default Heading;
