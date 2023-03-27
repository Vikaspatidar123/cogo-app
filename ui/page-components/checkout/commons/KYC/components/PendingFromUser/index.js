import { getByKey } from '@cogoport/utils';

import CPKycSection from './CPKycSection';
import CPLoading from './CPLoading';
import IEKycSection from './IEKycSection';
import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

const KYC_ACCOUNT_TYPE_COMPONENT_MAPPING = {
	channel_partner   : CPKycSection,
	importer_exporter : IEKycSection,
	service_provider  : CPKycSection,
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

	if (accountType === 'channel_partner' && loading) {
		return <CPLoading />;
	}

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
			<div className={styles.header_text}>SUBMIT YOUR KYC</div>
			{renderKycByAccountType()}
		</>
	);
}

export default PendingFromUser;
