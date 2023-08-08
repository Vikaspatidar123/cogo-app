import { Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import FileUploader from '@/packages/forms/Business/FileUploader';

function Uploader({ documentDetails = '', setDocumentDetails = () => {}, show = false, setShow = () => {} }) {
	const { image_url = '' } = documentDetails || {};

	const { t } = useTranslation(['documents']);

	const cancelUpload = () => {
		setDocumentDetails((prev) => ({
			...prev,
			image_url: '',
		}));
		setShow(false);
	};

	return (
		<Modal show={show} setShow={setShow} onClose={() => setShow(false)} showCloseIcon>
			<Modal.Body>
				<div className={styles.wrapper}>
					<div className={styles.heading}>{t('documents:documents_title_2')}</div>
					<FileUploader
						value={image_url}
						onChange={(e) => setDocumentDetails((prev) => ({
							...prev,
							image_url: e,
						}))}
						showProgress
						accept=".pdf,.png,.pkg,.jpg"
						className={styles.uploader}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={cancelUpload}
					themeType="secondary"
					className={styles.button}
				>
					{t('documents:documents_upload_button_label_1')}
				</Button>
				<Button themeType="accent" onClick={() => setShow(false)}>
					{t('documents:documents_upload_button_label_2')}
				</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default Uploader;
