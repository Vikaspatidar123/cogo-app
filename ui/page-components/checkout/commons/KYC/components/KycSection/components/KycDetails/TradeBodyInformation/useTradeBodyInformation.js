import { toast } from '@cogoport/front/components/admin';
import { useFormCogo } from '@cogoport/front/hooks';
import { getApiErrorString } from '@cogoport/front/utils';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import getTradeControls from './get-trade-controls';

const useTradeBodyInformation = ({
	channelPartnerDetails = {},
	kycDetails = {},
	setKycDetails = () => {},
}) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const { id = '' } = channelPartnerDetails;

	const controls = getTradeControls(channelPartnerDetails);

	const updateOrganizationAPI = useRequest(
		'post',
		false,
		scope,
	)('/update_channel_partner_organization');

	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
	} = useFormCogo(controls);

	const onSubmit = async (values = {}) => {
		try {
			const body = {
				trade_bodies: values.trade_bodies || undefined,
			};

			const res = await updateOrganizationAPI.trigger({
				data: {
					...body,
					partner_id: id,
					account_types: channelPartnerDetails.account_types,
				},
			});

			toast.success('Details updated successfully!');

			setKycDetails({
				...kycDetails,
				verification_progress:
					res.data?.verification_progress || kycDetails.verification_progress,
			});
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	return {
		controls,
		fields,
		handleSubmit,
		onSubmit,
		updateOrganizationAPILoading: updateOrganizationAPI.loading,
		formState,
	};
};

export default useTradeBodyInformation;
