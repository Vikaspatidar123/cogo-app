import { Checkbox, Button, Toast } from '@cogoport/components';
import { useState } from 'react';

import useUpdateCreditOrganizationRequest from '../../../hooks/useUpdateCreditOrganizationRequest';

import styles from './styles.module.css';

function TermsAndConditions() {
	const [checked, setChecked] = useState(false);

	const { updateRequest } = useUpdateCreditOrganizationRequest();

	const handleButtonClick = () => {
		if (!checked) {
			Toast.error('Please agree to terms and conditions');
			return null;
		}
		updateRequest();
		return null;
	};

	return (
		<div className={styles.flex_end}>
			<div>
				<Checkbox
					checked={checked}
					label="I agree to the terms and conditions"
					onChange={() => setChecked((prev) => !prev)}
				/>
			</div>
			<Button className={styles.button} onClick={handleButtonClick}>
				Check Eligibility
			</Button>
		</div>
	);
}

export default TermsAndConditions;
