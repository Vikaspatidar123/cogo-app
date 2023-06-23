import { Button, Toast } from '@cogoport/components';

import styles from './styles.module.css';

function Footer({ setCurrentStep, basicDetails }) {
	const { quotation_name, reason_type } = basicDetails;

	const handleNext = () => {
		if (!quotation_name) {
			return Toast.error('Enter quotation name');
		}
		if (!reason_type) {
			return Toast.error('Select reason to create quotation');
		}

		return setCurrentStep((prev) => prev + 1);
	};

	return (
		<div className={styles.container}>
			<Button onClick={handleNext}>
				Next
			</Button>
		</div>
	);
}

export default Footer;
