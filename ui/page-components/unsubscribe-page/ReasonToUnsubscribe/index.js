import { Button, Input, Select } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import OPTIONS from '../constants/options';

import styles from './styles.module.css';

function ReasonToUnsubscribe({
	onSubmit = () => { },
	onClickRedirect = () => { },
	loading = false,
}) {
	const { t } = useTranslation(['cancellationTicket']);
	const [reason, setReason] = useState('');
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
			<h1>{t('cancellationTicket:tell_us_text')}</h1>

			<div>
				{t('cancellationTicket:tell_us_description1_text')}
			</div>

			<p>
				{t('cancellationTicket:tell_us_description2_text')}
			</p>

			<div>
				<div className={styles.reason_heading}>{t('cancellationTicket:select_text')}</div>
				<div className={styles.select_box}>
					<Select
						placeholder={t('cancellationTicket:select_placeholder')}
						style={{ marginBottom: 8 }}
						value={reason}
						onChange={setReason}
						options={OPTIONS({ t })}
					/>
				</div>

				{reason === 'other' && (
					<div className={styles.describe_box}>
						<div className={styles.reason_heading}>{t('cancellationTicket:please_describe_text')}</div>
						<div className={styles.description_box}>
							<Input
								value={description}
								onChange={(e) => setDescription(e)}
								placeholder={t('cancellationTicket:input_placeholder')}
							/>
						</div>
					</div>
				)}

				{errorMessage && (
					<div className={styles.error_message}>
						{t('cancellationTicket:unsubscribe_error_message')}
					</div>
				)}
			</div>

			<div className={styles.footer}>
				<Button
					themeType="secondary"
					onClick={() => onClickRedirect()}
					type="button"
				>
					{t('cancellationTicket:cancel_button_text')}
				</Button>
				<Button
					className={styles.unsubscribe}
					themeType="primary"
					onClick={() => handleSubmit()}
					loading={loading}
					type="button"
				>
					{t('cancellationTicket:submit_button_text')}
				</Button>
			</div>
		</div>
	);
}
export default ReasonToUnsubscribe;
