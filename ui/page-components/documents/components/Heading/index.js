import { useTranslation } from 'next-i18next';

import UploadDocument from '../UploadDocument';

import styles from './styles.module.css';

function Heading({
	setShow = () => {}, documentDetails = {}, addDocument = () => {},
	loading = false, setDocumentDetails = () => {},
}) {
	const { t } = useTranslation(['documents']);

	return (
		<div className={styles.header}>
			<div className={styles.title}>{t('documents:documents_heading')}</div>
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
