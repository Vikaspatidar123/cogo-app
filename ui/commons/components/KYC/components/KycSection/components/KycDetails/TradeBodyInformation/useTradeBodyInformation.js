import { Toast } from '@cogoport/components';

import getTradeControls from './get-trade-controls';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useTradeBodyInformation = ({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) => {
	const { id = '' } = channelPartnerDetails;

	const controls = getTradeControls(channelPartnerDetails);

	const [{ loading }, updateOrganizationAPI] = useRequest({
		url    : '/update_channel_partner_organization',
		method : 'post',
	}, { manual: true });

	const {
		handleSubmit = () => {},
		formState = {},
		control,
	} = useForm();

	const onSubmit = async (values = {}) => {
		try {
			const body = {
				trade_bodies: values.trade_bodies || undefined,
			};

			const res = await updateOrganizationAPI({
				data: {
					...body,
					partner_id    : id,
					account_types : channelPartnerDetails.account_types,
				},
			});

			Toast.success('Details updated successfully!');

			setKycDetails({
				...kycDetails,
				verification_progress:
					res.data?.verification_progress || kycDetails.verification_progress,
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};

	return {
		controls,
		control,
		handleSubmit,
		onSubmit,
		updateOrganizationAPILoading: loading,
		formState,
	};
};

export default useTradeBodyInformation;
