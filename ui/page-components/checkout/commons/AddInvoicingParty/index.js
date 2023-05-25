import { RadioGroup, Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import InvoicingParties from './InvoicingParties';
import styles from './styles.module.css';

const COMPONENTS_MAPPING = {
	invoice_to_self: {
		label     : 'Invoice to Self',
		component : InvoicingParties,
	},
	invoice_to_trade_partner: {
		label     : 'Invoice to Trade Partner',
		component : InvoicingParties,
	},
};

const RADIO_GROUP_OPTIONS = Object.entries(COMPONENTS_MAPPING).map(
	([key, value]) => ({ label: value.label, value: key }),
);

function AddInvoicingParty({
	type = '',
	organizationDetails = {},
	disabledParties = [],
	primary_service,
	updateInvoicingParty = () => {},
	withModal = true,
	isIE = false,
	disabledAddInvoicingPartyButton = false,
	setIgstValues = () => {},
	source,
}) {
	const [activeComponentKey, setActiveComponentKey] = useState(
		() => RADIO_GROUP_OPTIONS[0].value,
	);
	const [isAddInvoice, setIsAddInvoice] = useState(false);

	const onClose = () => {
		setIsAddInvoice(false);
	};

	const onClickingAddInvoicingParty = () => {
		if (!disabledAddInvoicingPartyButton) {
			setIsAddInvoice(true);
		}
	};

	const componentProps = {
		invoice_to_self: {
			organization : organizationDetails,
			primary_service,
			disabledParties,
			updateInvoicingParty,
			bookingType  : 'self',
			onClose,
			isIE,
			setIgstValues,
			source,
		},
		invoice_to_trade_partner: {
			organization : organizationDetails,
			primary_service,
			disabledParties,
			updateInvoicingParty,
			bookingType  : 'paying_party',
			onClose,
			setIgstValues,
			source,
		},
	};

	const ActiveComponent = COMPONENTS_MAPPING[activeComponentKey].component;
	const activeComponentProps = componentProps[activeComponentKey];
	const title = () => (
		<>
			<div className={styles.text}>New Invoicing Party</div>

			<div className={styles.radio_wrapper}>
				<RadioGroup
					options={RADIO_GROUP_OPTIONS}
					value={activeComponentKey}
					onChange={setActiveComponentKey}
				/>
			</div>
		</>
	);
	const renderModalContent = () => (
		<div>
			<Modal.Header title={title()} />

			<ActiveComponent
				key={activeComponentKey}
				{...activeComponentProps}
			/>
		</div>
	);

	if (!withModal) {
		return renderModalContent();
	}

	return (
		<div>
			<Button
				onClick={onClickingAddInvoicingParty}
				className={styles.btn}
				id="checkout_add_invoicing_parties"
				style={{
                	marginLeft: '8px',
				}}
				themeType="secondary"
				size="lg"
				disabled={disabledAddInvoicingPartyButton}
			>
				{type === 'change' ? 'Change' : '+ Add Invoicing Party'}
			</Button>

			{isAddInvoice && (
				<div>
					<Modal
						show={isAddInvoice}
						onOuterClick={onClose}
						onClose={onClose}
						styles={{
							dialog: {
								height        : '80vh',
								paddingTop    : 40,
								paddingBottom : 0,
								position      : 'relative',
							},
						}}
					>
						{renderModalContent()}
					</Modal>
				</div>
			)}
		</div>
	);
}

export default AddInvoicingParty;
