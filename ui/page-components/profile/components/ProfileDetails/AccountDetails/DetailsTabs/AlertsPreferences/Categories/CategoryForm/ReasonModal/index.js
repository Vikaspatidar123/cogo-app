import {
	Button,
	Modal,
	RadioGroup,
	Textarea,
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

	const { REASON_MAPPING, MAPPING } = getMappings();
	const head = () => (
		<div>
			<div className={styles.header}>
				Reason for unsubscription
			</div>

			<div className={styles.sub_head}>
				You will no longer receive marketing email from this list
			</div>
		</div>
	);
	return (
		<Modal
			show={showModal}
			onClose={() => setShowModal(false)}
			onOuterClick={() => setShowModal(false)}
			className={styles.modal}
		>

			<Modal.Header title={head()} />
			<Modal.Body>
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
			</Modal.Body>

			<div className={styles.container}>
				<div className={styles.title}>
					If you have a moment, please let us know why you unsubscribed:
				</div>

				<RadioGroup
					options={REASON_MAPPING}
					value={reason}
					onChange={(item) => setReason(item)}
					className={styles.radio}
				/>

				{reason === 'others' && (
					<Textarea
						value={otherReason}
						onChange={(e) => setOtherReason(e?.target?.value)}
						placeholder="Enter your reason"
					/>
				)}

				<div className={styles.end_box}>
					<Button className={styles.styled_button} onClick={handleClose}>
						Cancel
					</Button>

					<Button themeType="accent" onClick={handleSave}>
						Submit
					</Button>
				</div>
			</div>

		</Modal>
	);
}
export default ReasonModal;
