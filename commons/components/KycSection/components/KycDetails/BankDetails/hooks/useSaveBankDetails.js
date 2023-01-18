import useRequest from '@/temp/request/useRequest';
import showErrorsInToast from '@/utils/showErrorsInToast';
import { useSelector } from '@cogoport/front/store';
import formatBankDetails from '../../utils/formatBankDetails';

const useSaveBankDetails = ({
	action = '',
	CONSTANTS = {},
	state = {},
	setState = () => {},
	setIsFormSaved = () => {},
	setKycDetails = () => {},
}) => {
	const {
		profile: { partner = {} },
	} = useSelector((reduxState) => reduxState);

	const {
		COMPONENT_KEYS: { ACCOUNT_INFORMATION },
	} = CONSTANTS;

	const { partnerId = '', [ACCOUNT_INFORMATION]: accountInformation = {} } =
		state;

	const { bankDetails = {} } = accountInformation;
	const { formValues: bankDetailsFormValues = {} } = bankDetails;

	let apiName = 'create_channel_partner_bank_details';
	if (action === 'edit') {
		apiName = 'update_channel_partner_bank_details';
	}

	const api = useRequest('post', false)(`/${apiName}`);

	const getPayload = ({ values = {} }) => {
		const { verifications = [], twin_importer_exporter_id = '' } = partner;

		const account_type = twin_importer_exporter_id
			? 'importer_exporter'
			: 'service_provider';

		const verification_data =
			verifications.find((verification) => {
				return verification.account_type === account_type;
			}) || {};

		const {
			account_holder_name,
			bank_account_number,
			ifsc_number,
			bank_name,
			branch_name,
			cancelled_cheque = {},
			// invoices = [],
		} = values;

		return {
			partner_id: partnerId,
			account_holder_name,
			bank_account_number,
			ifsc_number,
			bank_name,
			branch_name,
			cancelled_cheque: {
				...(action === 'edit' && {
					id: bankDetailsFormValues?.cancelled_cheque?.id,
				}),
				url: cancelled_cheque.url,
			},
			// invoices: invoices.map((invoice) => invoice.url),
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
		showErrorsInToast(error.data);
	};

	const saveBankDetails = async ({ values = {} }) => {
		try {
			const payload = getPayload({ values });

			const response = await api.trigger({ data: payload });

			onSuccess({ response: response.data });
		} catch (error) {
			onFailure(error);
		}
	};

	return {
		loading: api.loading,
		saveBankDetails,
	};
};

export default useSaveBankDetails;
