import { Modal, Checkbox, Button } from '@cogoport/components';
import { getCookie } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import CheckoutContext from '../../../../context';

import CancellationInfo from './CancellationInfo';
import ConfirmationInfo from './ConfirmationInfo';
import DefaultQuotationInfo from './DefaultQuotationInfo';
import styles from './styles.module.css';

const PUBLIC_PAGE_URL = 'https://www.cogoport.com';

const onClickInsurance = () => {
	const locale = getCookie('locale');
	window.open(`${PUBLIC_PAGE_URL}/${locale}/terms-and-conditions/insurance`, '_blank');
};

function EmailConfirmation({
	info = {},
	isApp = true,
	handleSendEmail = () => {},
	confirmation,
	setConfirmation,
	rate = { },
}) {
	const [isChecked, setIsChecked] = useState(false);
	const [isInsurance, setIsInsurance] = useState(false);
	const [{ primaryService, services, detail }] = useContext(CheckoutContext);
	const { detail: appDetail, services: appServices, primaryServiceData } = info;
	const insurance = Object.values(appServices || {}).find((x) => ['cargo_insurance'].includes(x.service_type));

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
				'By accepting this, you are agreeing to the above Terms and Conditions',
		};
	}
	const check = insurance ? isInsurance && isChecked : isChecked;

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
				<Checkbox
					checked={isChecked}
					onChange={(e) => {
						setIsChecked(e?.target?.checked);
					}}
				/>
				<div className={styles.checkbox}>{confirmInfo.confirmation}</div>
			</div>

			{insurance ? (
				<div className={styles.check_box_container}>
					<Checkbox
						checked={isInsurance}
						onChange={(e) => {
							setIsInsurance(e?.target?.checked);
						}}
					/>
					<div className={styles.checkbox}>
						By accepting this,
						you are agreeing to the
						<span
							role="presentation"
							onClick={() => onClickInsurance()}
							className={styles.insurance}
						>
							Insurance Terms and Conditions
						</span>
					</div>
				</div>
			) : null}

			<div className={styles.button_container}>
				<Button type="button" onClick={handleSubmit} disabled={!check}>
					Confirm
				</Button>
			</div>
		</Modal>
	);
}

export default EmailConfirmation;
