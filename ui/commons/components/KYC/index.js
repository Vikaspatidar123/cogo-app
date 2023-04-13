import { Modal } from '@cogoport/components';
import React, { useState } from 'react';

import PendingFromUser from './components/PendingFromUser';
import PendingVerification from './components/PendingVerification';
import Rejected from './components/Rejected';

const KYC_STATUS_COMPONENT_MAPPING = {
	pending_from_user    : PendingFromUser,
	pending_verification : PendingVerification,
	rejected             : Rejected,
};

function KYC({
	organizationData,
	show,
	setShow = () => {},
	onClose = () => {},
	source,
}) {
	const { kyc_status } = organizationData;

	const [kycStatus, setKycStatus] = useState(kyc_status);
	const kycStatusComponentProps = {
		pending_from_user: {
			organizationData,
			setShow,
			onClose,
			source,
		},
		pending_verification: {
			organizationData,
		},
		rejected: {
			organizationData,
			setKycStatus,
		},
	};

	const renderModalContent = () => {
		const Component = KYC_STATUS_COMPONENT_MAPPING[kycStatus] || null;

		if (!Component) {
			return null;
		}

		const componentProps = kycStatusComponentProps[kycStatus] || {};

		return <Component key={kycStatus} {...componentProps} />;
	};

	return (
		<Modal
			show={show}
			size="lg"
			onClose={() => setShow(false)}
			closable={source !== 'booking_confirmation'}
		>
			{renderModalContent()}
		</Modal>
	);
}

export default KYC;
