import { Modal } from '@cogoport/components';

import IEKycSection from './IEKycSection';

const KYC_ACCOUNT_TYPE_COMPONENT_MAPPING = {
	importer_exporter: IEKycSection,
};

function PendingFromUser({ organizationData, setShow, onClose, source }) {
	const { account_type = '' } = organizationData;

	const accountType = account_type || 'importer_exporter';
	const renderKycByAccountType = () => {
		const kycAccountTypeComponentProps = {
			importer_exporter: {
				source,
				setShow,
				onClose,
				organizationData,
			},
			service_provider: {},
		};

		const Component = KYC_ACCOUNT_TYPE_COMPONENT_MAPPING[accountType] || null;

		if (!Component) {
			return null;
		}

		const componentProps = kycAccountTypeComponentProps[accountType] || {};

		return <Component key={accountType} {...componentProps} />;
	};

	return (
		<>
			<Modal.Header title="SUBMIT YOUR KYC" />
			{renderKycByAccountType()}
		</>
	);
}

export default PendingFromUser;
