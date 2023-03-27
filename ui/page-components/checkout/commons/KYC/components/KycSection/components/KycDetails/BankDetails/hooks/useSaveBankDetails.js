import { Toast } from '@cogoport/components';

import formatBankDetails from '../../utils/formatBankDetails';

import { useRequest } from '@/packages/request';

const useSaveBankDetails = ({
	action = '',
	CONSTANTS = {},
	state = {},
	setState = () => {},
	setIsFormSaved = () => {},
	setKycDetails = () => {},
	channelPartnerDetails = {},
}) => {
	const {
		COMPONENT_KEYS: { ACCOUNT_INFORMATION },
	} = CONSTANTS;

	const { partnerId = '', [ACCOUNT_INFORMATION]: accountInformation = {} } =		state;

	const { bankDetails = {} } = accountInformation;
	const { formValues: bankDetailsFormValues = {} } = bankDetails;

	let apiName = 'create_channel_partner_bank_details';
	if (action === 'edit') {
		apiName = 'update_channel_partner_bank_details';
	}

	const [{ loading }, trigger] = useRequest({
		url    : `/${apiName}`,
		method : 'post',
	}, { manual: true });

	const getPayload = ({ values = {} }) => {
		const { verification = [], twin_importer_exporter_id = '' } =			channelPartnerDetails;

		const account_type = twin_importer_exporter_id
			? 'importer_exporter'
			: 'service_provider';

		const verification_data =			verification.find((data) => data.account_type === account_type) || {};

		const {
			account_holder_name,
			bank_account_number,
			ifsc_number,
			bank_name,
			branch_name,
			cancelled_cheque = {},
		} = values;

		return {
			id               : partnerId,
			account_holder_name,
			bank_account_number,
			ifsc_number,
			bank_name,
			branch_name,
			cancelled_cheque : {
				...(action === 'edit' && {
					id: bankDetailsFormValues?.cancelled_cheque?.id,
				}),
				url: cancelled_cheque.url,
			},
			verification_id: verification_data.id,
		};
	};

	const onSuccess = ({ response = {} }) => {
		setKycDetails((previousState) => ({
			...previousState,
			verification_progress: {
				...previousState.verification_progress,
				...(response || {}).verification_progress,
			},
		}));

		setState((previousState) => ({
			...previousState,
			[ACCOUNT_INFORMATION]: {
				...(previousState[ACCOUNT_INFORMATION] || {}),
				bankDetails: {
					formValues: formatBankDetails({
						documents: response.partner.documents,
					}),
				},
			},
		}));

		setIsFormSaved(true);
	};

	const onFailure = (error = {}) => {
		Toast.error(error.data);
	};

	const saveBankDetails = async ({ values = {} }) => {
		try {
			const payload = getPayload({ values });

			const response = await trigger({ data: payload });

			onSuccess({ response: response.data });
		} catch (error) {
			onFailure(error);
		}
	};

	return {
		loading,
		saveBankDetails,
	};
};

export default useSaveBankDetails;
