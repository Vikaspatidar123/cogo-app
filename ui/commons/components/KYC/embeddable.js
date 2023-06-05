import React, { useState } from 'react';

import PendingFromUser from './components/PendingFromUser';
import PendingVerification from './components/PendingVerification';
import Rejected from './components/Rejected';

const KYC_STATUS_COMPONENT_MAPPING = {
	pending_from_user    : PendingFromUser,
	pending_verification : PendingVerification,
	rejected             : Rejected,
};

function KYCEmbeddable({
	organizationData,
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

	const Component = KYC_STATUS_COMPONENT_MAPPING[kycStatus] || null;

	if (!Component) {
		return null;
	}

	const componentProps = kycStatusComponentProps[kycStatus] || {};

	return <Component key={kycStatus} {...componentProps} />;
}

export default KYCEmbeddable;
