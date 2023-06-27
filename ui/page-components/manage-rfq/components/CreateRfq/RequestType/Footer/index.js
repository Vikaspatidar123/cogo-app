import { Toast, Button } from '@cogoport/components';

import styles from './styles.module.css';

function Footer({ setCurrentStep, basicDetails }) {
	const handleNext = () => {
		if (!basicDetails.request_type) {
			Toast.error('Select Creation type');
		} else {
			setCurrentStep((prev) => prev + 1);
		}
	};

	return (
		<div className={styles.container}>
			<Button
				themeType="secondary"
				className={styles.back}
				onClick={() => setCurrentStep((prev) => prev - 1)}
			>
				Back
			</Button>
			<Button className="primary" onClick={handleNext}>
				Next
			</Button>
		</div>
	);
}

export default Footer;
