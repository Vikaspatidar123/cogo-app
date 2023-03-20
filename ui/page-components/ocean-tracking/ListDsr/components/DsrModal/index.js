/* eslint-disable no-nested-ternary */
// import React, { useState } from 'react';

import { Modal } from '@cogoport/components';
import { useState } from 'react';

import SelectPoc from './components/SelectPoc';
import SelectSchedule from './components/SelectSchedule';
import SelectShipment from './components/SelectShipment';
import Steps from './components/Steps';

function DsrModal({ isOpen, handleModal, type = 'new', dsrId, initialStep = 0, dsrs, setDsrs }) {
	const [step, setStep] = useState(initialStep);
	const [heading, setHeading] = useState('');
	const [selectedPoc, setSelectedPoc] = useState(null);
	const [selectedDsrId, setDsrId] = useState(dsrs || []);

	const selectedDsr = dsrs?.filter?.((item) => item.id === selectedDsrId)[0] || {};
	const pocName = selectedDsr?.poc_details?.name || selectedPoc?.name;
	const pocId = selectedDsr?.poc_details?.id || selectedPoc?.id;

	return (
		<Modal
			show={isOpen}
			onClose={handleModal}
			placement="center"
		>
			<Modal.Header title={heading} />
			{step > 0 && (
				<Steps
					stepList={[{ heading: 'SELECT SHIPMENT' }, { heading: 'SELECT SCHEDULE' }]}
					current={step - 1}
				/>
			)}
			{step === 0 ? (
				<SelectPoc
					setHeading={setHeading}
					setStep={setStep}
					setSelectedPoc={setSelectedPoc}
					setDsrId={setDsrId}
				/>
			) : step === 1 ? (
				<SelectShipment
					setHeading={setHeading}
					setStep={setStep}
					type={type}
					dsrId={selectedDsrId}
					pocName={pocName}
					pocId={pocId}
				/>
			) : step === 2 ? (
				<SelectSchedule
					setHeading={setHeading}
					setStep={setStep}
					type={type}
					dsrId={selectedDsrId}
					selectedDsr={selectedDsr}
					pocName={pocName}
					handleModal={handleModal}
					dsrs={dsrs}
					setDsrs={setDsrs}
				/>
			) : null}
		</Modal>
	);
}

export default DsrModal;
