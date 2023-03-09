import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useUploadDocuments from '../../../hooks/useUploadDocuments';

import {
	csvImg, downloadUrl, successBackgroundImg, tickIcon,
} from './link';
import styles from './styles.module.css';

import { UploadController, useForm } from '@/packages/forms';

function UploadDocument({ uploadModal, setUploadModal, refetchProduct }) {
	const [show, setShow] = useState(undefined);
	const {
		uploadDocuments, fileValue, setFileValue, loading, value, getDownloadExcel,
	} =		useUploadDocuments({
		setUploadModal,
		refetchProduct,
		setShow,
	});

	const {
		control, watch,
	} = useForm();

	const formValues = watch();

	const { file_uploader } = formValues || {};
	const { finalUrl } = file_uploader || {};

	// const { success = false } = fileValue || {};

	const downloadSample = () => {
		window.open(downloadUrl, '_self');
	};

	const handleFileChange = (url) => {
		setFileValue(url);
	};

	const generateInvalidRecordsId = value.generateInvalidEntriesId;

	const getInvalidExcel = () => {
		getDownloadExcel(generateInvalidRecordsId);
	};

	return (
		<Modal
			className={styles.container}
			show={uploadModal}
			onClose={() => setUploadModal(false)}
			onOuterClick={() => setUploadModal(false)}
			width="550"
			height="200"
		>
			<div>
				{show === undefined && (
					<>
						<div className={styles.header_container}>
							<div className={styles.heading}>
								<img src={`${csvImg}`} alt="csv img" height="20" width="30" />
								Import .csv document
							</div>
							<Button onClick={downloadSample}>Sample File</Button>
						</div>
						<div className={styles.upload_container}>
							<div className={styles.aws_container}>
								<UploadController
									control={control}
									format=".xlsx"
									accept=".xlsx"
									value={fileValue}
									onChange={(e) => handleFileChange(e)}
									name="file_uploader"
									rules={{ required: 'file_uploader is required.' }}
								/>
							</div>
							<div className={styles.button_container}>
								<Button
									className={styles.styled_button}
									loading={loading}
									disabled={finalUrl === undefined}
									onClick={uploadDocuments}
								>
									SUBMIT
								</Button>
							</div>
						</div>
					</>
				)}
			</div>

			{!show && show !== undefined && (
				<>
					<div className={styles.succes_back_img}>
						<img src={`${successBackgroundImg}`} width="550" height="120" alt="success" />
					</div>
					<div className={styles.tick_icon}>
						<img src={`${tickIcon}`} width="100" height="45" alt="tick icon" />
					</div>
					<div className={styles.success_msg}>Your document has been partially uploaded !</div>

					<div className={styles.download_error_link}>
						<div
							className={styles.link}
							role="presentation"
							onClick={() => getInvalidExcel()}
						>
							Download

						</div>
						&nbsp;error file and re-upload &nbsp;
						<div
							className={styles.link}
							role="presentation"
							onClick={() => {
								setShow(undefined);
								setFileValue({});
							}}
						>
							here
						</div>
					</div>
				</>
			)}

			{show && (
				<div className={styles.success_modal}>
					<div className={styles.success_back_img}>
						<img src={`${successBackgroundImg}`} width="550" height="140" alt="success" />
					</div>
					<div className={styles.tick_icon}>
						<img src={`${tickIcon}`} width="100" height="45" alt="tick icon" />
					</div>
					<div className={styles.success_msg}>You have successfully uploaded the document!</div>
				</div>
			)}
		</Modal>
	);
}

export default UploadDocument;
