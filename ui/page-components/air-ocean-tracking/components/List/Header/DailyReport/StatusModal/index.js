import { Modal, ButtonIcon, Stepper } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import AllContact from './AllContact';
import Shipments from './SelectShipment';
import styles from './styles.module.css';

const items = [
	{ title: 'Select Shipment', key: 'shipment' },
	{ title: 'Select Schedule', key: 'schedule' },
];

const renderTitle = ({ isSingleReport, name }) => {
	if (isSingleReport) return `Status report for ${startCase(name)}`;
	return 'Create New Schedule Status';
};

function StatusModal({ statusModal, setStatusModal }) {
	const [selectedContact, setSelectedContact] = useState('');
	const [isSingleReport, setIsSingleReport] = useState(false);
	const [activeStepper, setActiveStepper] = useState('shipment');

	return (
		<Modal show={statusModal} onClose={() => setStatusModal(false)}>
			<div className={styles.header}>
				<div className={styles.title}>{renderTitle({ isSingleReport, name: selectedContact?.name })}</div>
				<ButtonIcon size="lg" icon={<IcMCross />} themeType="primary" onClick={() => setStatusModal(false)} />
			</div>
			{!isSingleReport &&	(
				<AllContact
					selectedContact={selectedContact}
					setSelectedContact={setSelectedContact}
					setIsSingleReport={setIsSingleReport}
				/>
			)}
			{isSingleReport && (
				<div className={styles.body}>
					<div className={styles.stepper_container}>
						<Stepper active={activeStepper} setActive={setActiveStepper} items={items} arrowed />
					</div>
					{activeStepper === 'shipment' && (
						<div>
							<Shipments />
						</div>
					)}
				</div>
			)}
		</Modal>
	);
}

export default StatusModal;
