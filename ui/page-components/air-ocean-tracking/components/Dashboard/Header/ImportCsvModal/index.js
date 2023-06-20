import { Modal, FileSelect, Button, ButtonIcon } from '@cogoport/components';
import { IcMAppDocumentUpload, IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

const DOWNLOAD_SAMPLE_FILE = {
	ocean:
	'https://cogoport-production.sgp1.digitaloceanspaces.com/ee7801fe47be5e56b0cb306e1ea22889/sample_import_sheet.csv',
	air: 'https://cogoport-production.sgp1.digitaloceanspaces.com/ea41e8fc91cc30257bb086056c3b6291/airway_bill_no.csv',
};

const downloadSampleHandler = ({ trackingType }) => {
	window.open(DOWNLOAD_SAMPLE_FILE[trackingType]);
};

function ImportCsvModal({ csvModal, setCsvModal, trackingType = 'ocean', operatorData = {} }) {
	const [fileValue, setFileValue] = useState('');
	const closeModalHandler = () => setCsvModal(false);
	return (
		<Modal show={csvModal} onClose={closeModalHandler} closeOnOuterClick showCloseIcon>
			<div className={styles.container}>
				<div className={styles.header}>
					<h3>Import your CSV file to track at once</h3>
					<ButtonIcon icon={<IcMCross />} onClick={closeModalHandler} />
				</div>
				<div className={styles.main_body}>
					<FileSelect
						value={fileValue}
						onChange={setFileValue}
						uploadDesc="Drag your files here or browse"
						uploadIcon={<IcMAppDocumentUpload width={50} height={50} />}
						accept=".csv"
					/>

					<Button
						type="button"
						themeType="linkUi"
						onClick={() => downloadSampleHandler({ trackingType })}
					>
						Download the sample file here
					</Button>
					<Button type="button" themeType="accent" className={styles.footer_btn}>Import</Button>
				</div>

			</div>
		</Modal>
	);
}

export default ImportCsvModal;
