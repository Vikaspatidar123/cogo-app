import useRequest from '@/utils/request/useRequest';
import { setProfileStoreState } from '@/utils/stores';
import { toast } from '@cogoport/front/components';
import { useFormCogo } from '@cogoport/front/hooks';
import { useSelector, useDispatch } from '@cogoport/front/store';
import { getApiErrorString } from '@cogoport/front/utils';
import getTradeControls from './get-trade-contorls';

const useTradeBodyInformation = ({
	kycDetails = {},
	setKycDetails = () => {},
}) => {
	const { profile = {} } = useSelector((state) => state);
	const { partner = {} } = profile;

	const { twin_importer_exporter_id = '' } = partner;

	const dispatch = useDispatch();

	const controls = getTradeControls(partner);

	const updateOrganizationAPI = useRequest(
		'post',
		false,
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

			const account_type = twin_importer_exporter_id
				? 'importer_exporter'
				: 'service_provider';

			const res = await updateOrganizationAPI.trigger({
				data: {
					...body,
					account_types: [account_type],
				},
			});

			toast.success('Details updated successfully!');

			setKycDetails({
				...kycDetails,
				verification_progress:
					res.data?.verification_progress || kycDetails.verification_progress,
			});

			dispatch(
				setProfileStoreState({
					partner: {
						...partner,
						...body,
					},
				}),
			);
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
