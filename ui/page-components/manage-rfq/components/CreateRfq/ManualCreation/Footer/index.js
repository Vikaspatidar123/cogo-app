import { cl, Modal, Button } from '@cogoport/components';
import { IcMError } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Footer({
	currentStep,
	setCurrentStep = () => {},
	importerExporterDetails = {},
	draftFormData,
	editForm,
	showForm,
	createRfqSearch = () => {},
	loading = false,
	totalDraftsCount = 0,
}) {
	const [show, setShow] = useState('');
	const checkButton = (showForm || editForm) && totalDraftsCount !== 0;

	const handleClick = (checkError = true) => {
		if (checkError) {
			if (totalDraftsCount === 0) {
				setShow('Please save atleast one port pair to create RFQ.');
				return;
			}
			if (showForm) {
				setShow(
					'A new port pair was filled but not saved. Do you want to proceed further without saving it?',
				);
				return;
			}
			if (editForm) {
				setShow(
					'A port pair is in edit state. Do you want to proceed further without saving it?',
				);
				return;
			}
		}
		let newRfqData = {};
		if (draftFormData?.rfq_id) {
			newRfqData = {
				...importerExporterDetails,
				rfq_id: draftFormData?.rfq_id,
			};
			createRfqSearch(newRfqData);
		}
	};

	return (
		<>

			<div className={styles.container}>
				<div>
					{!draftFormData?.rfq_id && (
						<Button
							themeType="secondary"
							onClick={() => currentStep > 1 && setCurrentStep((prev) => prev - 1)}
							disabled={currentStep === 1}
							type="button"
						>
							back
						</Button>
					)}
				</div>

				<Button
					onClick={handleClick}
					disabled={loading}
					type="button"
				>
					Send Rfq Request
				</Button>
			</div>
			<Modal
				show={show !== ''}
				onClose={() => setShow('')}
				onOuterClick={() => setShow('')}
			>
				<div className={styles.modal_container}>
					<div className={styles.error_icon}>
						<IcMError />
					</div>
					<div className={styles.error_text}>{show}</div>
					<div className={cl`${styles.btn_container} ${checkButton ? styles.justify : styles.center}`}>
						<Button
							className="secondary md"
							onClick={() => setShow('')}
							disabled={loading}
						>
							{checkButton ? 'No' : 'Ok'}
						</Button>
						{checkButton && (
							<Button
								themeType="secondary"
								onClick={() => handleClick(false)}
								disabled={loading}
							>
								Yes
							</Button>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
}

export default Footer;
