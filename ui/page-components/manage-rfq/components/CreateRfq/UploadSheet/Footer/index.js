import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Footer({ setCurrentStep, rfqSheetLoading }) {
	return (
		<div className={styles.container}>
			<Button
				themeType="secondary"
				disabled={rfqSheetLoading}
				onClick={() => setCurrentStep((prev) => prev - 1)}
			>
				Back
			</Button>
			<Button type="submit" className={styles.upload} loading={rfqSheetLoading} disabled={rfqSheetLoading}>
				Upload
			</Button>
		</div>
	);
}

export default Footer;
