import {
	Button,
	Modal,
	RadioGroup,
	TextArea,
} from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { getMappings } from '../../../../../../../../constants';

import styles from './styles.module.css';

function ReasonModal({
	updatePreference,
	formData,
	showModal,
	setShowModal,
	filteredDataState = {},
}) {
	const [reason, setReason] = useState('');

	const [otherReason, setOtherReason] = useState('');

	const handleSave = async () => {
		await updatePreference({
			...formData,
			reason,
			otherReason,
			setShowModal,
		});

		setReason(false);
		setOtherReason(false);
	};

	const handleClose = () => {
		setShowModal(false);
		setReason(false);
		setOtherReason(false);
	};

	const { t } = useTranslation(['profile']);

	const { REASON_MAPPING, MAPPING } = getMappings();

	return (
		<Modal
			show={showModal}
			className="primary md"
			onClose={() => setShowModal(false)}
			onOuterClick={() => setShowModal(false)}
		>
			<div className={styles.container}>
				<div className={styles.header}>
					ails.tabOptions.alerts.cat
				</div>

				<div className={styles.sub_head}>
					ccountDetails.tabOptions.alerts.categor
				</div>

				<div className={styles.card}>
					{Object.entries(filteredDataState).map(([key, value], index) => {
						if (!value) {
							return (
								<div className={styles.box}>
									<div className={styles.count}>{index + 1}</div>
									<div className={styles.inline}>
										<div className={styles.label}>{MAPPING[key].label}</div>
										<div className={styles.sub_label}>{MAPPING[key].sublabel}</div>
									</div>
								</div>
							);
						}
						return null;
					})}
				</div>

				<div className={styles.title}>
					ails.tabOptions.alerts.categoryForm.
				</div>

				<RadioGroup
					options={REASON_MAPPING}
					value={reason}
					onChange={(item) => setReason(item)}
				/>

				{reason === 'others' && (
					<TextArea
						value={otherReason}
						onChange={(e) => setOtherReason(e?.target?.value)}
						placeholder={t(
							'profile:accountDetails.tabOptions.alerts.categoryForm.reason.textArea.placeholder',
						)}
					/>
				)}

				<div className={styles.end_box}>
					<Button className={styles.styled_button} onClick={handleClose}>
						.tabOptions.alerts.categoryFor
					</Button>

					<Button className="primary md" onClick={handleSave}>
						Details.tabOptions.alerts.categoryForm.reason.button
					</Button>
				</div>
			</div>
		</Modal>
	);
}
export default ReasonModal;
