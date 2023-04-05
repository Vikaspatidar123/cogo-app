import { Modal } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';

import IEKycSection from './IEKycSection';
import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

const KYC_ACCOUNT_TYPE_COMPONENT_MAPPING = {
	importer_exporter: IEKycSection,
};

function PendingFromUser({ organizationData, setShow, onClose, source }) {
	const { tags, account_type = '' } = organizationData;

	let accountType = account_type;
	if (tags.includes('partner') || account_type === 'service_provider') {
		accountType = 'channel_partner';
	}

	const [{ loading }, api] = useRequest({
		url         : 'get_channel_partner',
		accountType : 'channel_partner',
		method      : 'get',
		params      : {
			id                              : organizationData.partner_id,
			account_types                   : [organizationData.account_type],
			importer_exporter_data_required : true,
		},
	}, { manual: true });

	const renderKycByAccountType = () => {
		const kycAccountTypeComponentProps = {
			channel_partner: {
				source,
				setShow,
				onClose,
				channelPartnerDetails: getByKey(api, 'data.partner') || {},
			},
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
