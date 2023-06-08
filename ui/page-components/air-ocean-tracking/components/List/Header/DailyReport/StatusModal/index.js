import { Modal, ButtonIcon, Stepper } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import AllContact from './AllContact';
import SelectSchedule from './SelectSchedule';
import Shipments from './SelectShipment';
import styles from './styles.module.css';

const items = [
	{ title: 'Select Shipment', key: 'shipments' },
	{ title: 'Select Schedule', key: 'schedule' },
];

const renderTitle = ({ isSingleReport, name }) => {
	if (isSingleReport) return `Status report for ${startCase(name)}`;
	return 'Create New Schedule Status';
};

function StatusModal({ statusModal, setStatusModal, dsrList = [], getDsrList }) {
	const [selectedContact, setSelectedContact] = useState('');
	const [isSingleReport, setIsSingleReport] = useState(false);
	const [activeStepper, setActiveStepper] = useState('shipments');

	const { isOpen, stepper = '', info = {} } = statusModal;

	const closeModalHandler = () => setStatusModal({ isOpen: false });

	useEffect(() => {
		if (stepper && info) {
			const { poc_details = {}, id } = info || {};
			setIsSingleReport(true);
			setSelectedContact({ ...poc_details, dsrId: id });
			setActiveStepper(stepper);
		}
	}, [stepper, info]);

	return (
		<Modal show={isOpen} onClose={closeModalHandler} size={isSingleReport ? 'lg' : 'md'}>
			<div className={styles.header}>
				<div className={styles.title}>{renderTitle({ isSingleReport, name: selectedContact?.name })}</div>
				<ButtonIcon size="lg" icon={<IcMCross />} themeType="primary" onClick={closeModalHandler} />
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

					{activeStepper === 'shipments' && (
						<div>
							<Shipments
								selectedContact={selectedContact}
								setIsSingleReport={setIsSingleReport}
								setActiveStepper={setActiveStepper}
							/>
						</div>
					)}

					{activeStepper === 'schedule' && (
						<div>
							<SelectSchedule
								dsrList={dsrList}
								setActiveStepper={setActiveStepper}
								selectedContact={selectedContact}
								closeModalHandler={closeModalHandler}
								getDsrList={getDsrList}
							/>
						</div>
					)}
				</div>
			)}
		</Modal>
	);
}

export default StatusModal;
