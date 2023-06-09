import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

import FileUploader from '@/packages/forms/Business/FileUploader';

function Uploader({ documentDetails = '', setDocumentDetails = () => {}, show = false, setShow = () => {} }) {
	const { image_url = '' } = documentDetails || {};

	const cancelUpload = () => {
		setDocumentDetails((prev) => ({
			...prev,
			image_url: '',
		}));
		setShow(false);
	};

	return (

		<Modal show={show} setShow={setShow} onClose={() => setShow(false)} showCloseIcon closeOnOuterClick>
			<Modal.Body>
				<div className={styles.wrapper}>
					<div className={styles.heading}>Upload documents</div>
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
					Cancel
				</Button>
				<Button themeType="accent" onClick={() => setShow(false)}>Save</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default Uploader;
