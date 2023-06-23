import { Toast, Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import { COGO_FORMAT_SAMPLE_FILE } from '../../../../constant';

import styles from './styles.module.css';

function FirstStep({ service }) {
	const handleDownload = () => {
		if (!service) {
			Toast.error('Please select Service');
			return;
		}
		window.open(COGO_FORMAT_SAMPLE_FILE[service], '_blank');
	};
	return (
		<div className={styles.btn_container}>
			<div className={styles.step}>Step 2: Download Cogo Format Excel</div>
			<div className={styles.details}>
				<div className={styles.sublabel}>Fill the downloaded excel with your details.</div>

				<Button themeType="secondary" onClick={handleDownload}>
					<IcMDownload className={styles.download_icon} />
					Download
				</Button>
			</div>
		</div>
	);
}

export default FirstStep;
