import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

import FileUploader from '@/packages/forms/Business/FileUploader';

function Uploader({ proofUrl = '', setProofUrl = () => { }, show = false, setShow = () => { } }) {
	const cancelUpload = () => {
		setProofUrl('');
		setShow(false);
	};

	return (

		<Modal show={show} onClose={() => setShow(false)} showCloseIcon closeOnOuterClick>
			<Modal.Body>
				<div className={styles.wrapper}>
					<div className={styles.heading}>Upload documents</div>
					<FileUploader
						value={proofUrl}
						onChange={(e) => setProofUrl(e)}
						showProgress
						accept=".pdf,.png,.pkg,.jpg"
						className={styles.uploader}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					type="button"
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
