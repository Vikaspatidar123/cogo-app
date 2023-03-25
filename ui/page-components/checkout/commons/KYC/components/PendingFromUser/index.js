import { get } from '@cogoport/front/utils';

import CPKycSection from './CPKycSection';
import CPLoading from './CPLoading';
import IEKycSection from './IEKycSection';
// import LSPKycSection from './LSPKycSection';
import styles from './styles.module.css';

const KYC_ACCOUNT_TYPE_COMPONENT_MAPPING = {
	channel_partner   : CPKycSection,
	importer_exporter : IEKycSection,
	service_provider  : CPKycSection,
};

function PendingFromUser({ organizationData, setShow, onClose, source }) {
	const { tags, account_type = '' } = organizationData;

	const {
		general: { scope },
	} = useSelector((state) => state);

	let accountType = account_type;
	if (tags.includes('partner') || account_type === 'service_provider') {
		accountType = 'channel_partner';
	}

	const api = useRequest(
		'get',
		accountType === 'channel_partner',
		scope,
	)('/get_channel_partner', {
		params: {
			id                              : organizationData.partner_id,
			account_types                   : [organizationData.account_type],
			importer_exporter_data_required : true,
		},
	});

	if (accountType === 'channel_partner' && api.loading) {
		return <CPLoading />;
	}

	const renderKycByAccountType = () => {
		const kycAccountTypeComponentProps = {
			channel_partner: {
				source,
				setShow,
				onClose,
				channelPartnerDetails: get(api, 'data.partner') || {},
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
