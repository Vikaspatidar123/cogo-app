import { Button, Input, Select } from '@cogoport/components';
import { useState } from 'react';

import OPTIONS from '../constants/options';

import styles from './styles.module.css';

function ReasonToUnsubscribe({
	onSubmit = () => {},
	onClickRedirect = () => {},
	loading = false,
}) {
	const [reason, setReason] = useState();
	const [description, setDescription] = useState('');
	const [errorMessage, setErrorMessage] = useState(false);

	const handleSubmit = () => {
		if (description) {
			onSubmit(description);
		} else if (reason && reason !== 'other') {
			onSubmit(reason);
		} else {
			setErrorMessage(true);
		}
	};

	return (
		<div className={styles.container}>
			<h1>Tell us why...</h1>
			<div>
				Please note that your request for unsubscribing will be processed within
				the next 48 hours. During this time, a member of our team will reach out
				to you via the contact information you provided to confirm your decision
				and gather any additional information if necessary.
			</div>
			<p>
				This step allows us to ensure that your unsubscribe request is
				accurately processed and to better understand your preferences.
			</p>
			<div>
				<div className={styles.reason_heading}>Select a reason*</div>
				<div className={styles.select_box}>
					<Select
						placeholder="Select reason"
						style={{ marginBottom: 8 }}
						value={reason}
						onChange={setReason}
						options={OPTIONS}
					/>
				</div>
				{reason === 'other' && (
					<div className={styles.describe_box}>
						<div className={styles.reason_heading}>Please describe the issue</div>
						<div className={styles.description_box}>
							<Input
								value={description}
								onChange={(e) => setDescription(e)}
								placeholder="Type here..."
							/>
						</div>
					</div>
				)}
				{errorMessage && (
					<div className={styles.error_message}>
						*please give us a reason to unsubscribe
					</div>
				)}
			</div>
			<div className={styles.footer}>
				<Button
					themeType="secondary"
					onClick={() => onClickRedirect()}
					type="button"
				>
					Cancel
				</Button>
				<Button
					className={styles.unsubscribe}
					themeType="primary"
					onClick={() => handleSubmit()}
					loading={loading}
					type="button"
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
export default ReasonToUnsubscribe;
