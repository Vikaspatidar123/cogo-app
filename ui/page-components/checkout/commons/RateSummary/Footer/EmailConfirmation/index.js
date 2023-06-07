import { Modal, Checkbox, Button } from '@cogoport/components';
import React, { useState, useContext } from 'react';

import CheckoutContext from '../../../../context';

import CancellationInfo from './CancellationInfo';
import ConfirmationInfo from './ConfirmationInfo';
import DefaultQuotationInfo from './DefaultQuotationInfo';
import styles from './styles.module.css';

function EmailConfirmation({
	info = {},
	isApp = true,
	handleSendEmail = () => {},
	confirmation,
	setConfirmation,
}) {
	const [isChecked, setIsChecked] = useState(false);
	const [{ primaryService, services, rate, detail }] = useContext(CheckoutContext);
	const { detail: appDetail, services: appServices, primaryServiceData } = info;

	const handleSubmit = () => {
		setConfirmation(false);
		handleSendEmail();
	};

	let confirmInfo = {
		services         : rate?.services,
		detailedServices : services,
		primaryService,
		trade_type       : detail?.trade_type,
		detail,
		confirmation     : 'Have you confirmed with customer?',
	};

	if (isApp) {
		confirmInfo = {
			services         : appServices,
			detailedServices : primaryServiceData,
			primaryService   : primaryServiceData,
			trade_type       : appDetail?.trade_type,
			detail           : appDetail,
			confirmation:
				'By placing this booking, you are agreeing to the above Terms and Conditions',
		};
	}

	return (
		<Modal
			size="lg"
			show={confirmation}
			onClose={() => setConfirmation(false)}
		>
			<div className={styles.container}>
				<ConfirmationInfo {...confirmInfo} />

				<CancellationInfo detail={confirmInfo.detail} />
				<DefaultQuotationInfo />
			</div>

			<div className={styles.check_box_container}>
				<Checkbox checked={isChecked} onChange={setIsChecked} />
				<div className={styles.checkbox}>{confirmInfo.confirmation}</div>
			</div>

			<div className={styles.button_container}>
				<Button type="button" onClick={handleSubmit} disabled={!isChecked}>
					Confirm
				</Button>
			</div>
		</Modal>
	);
}

export default EmailConfirmation;
