import { Button, Toast, cl } from '@cogoport/components';

import styles from './styles.module.css';

function Footer({ setCurrentStep, basicDetails }) {
	const { quotation_name, reason_type, bidding_date } = basicDetails;

	const handleNext = () => {
		if (!quotation_name) {
			return Toast.error('Enter quotation name');
		}
		if (!reason_type) {
			return Toast.error('Select reason to create quotation');
		}
		if (reason_type === 'bidding' && !bidding_date) {
			return Toast.error('Select Bidding Date to Create Quotation');
		}

		return setCurrentStep((prev) => prev + 1);
	};

	return (
		<div className={cl`${styles.container} ${reason_type !== 'bidding' ? styles.add_margin : ''}`}>
			<Button onClick={handleNext}>
				Next
			</Button>
		</div>
	);
}

export default Footer;
