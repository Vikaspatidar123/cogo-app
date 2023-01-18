import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components';
import { useEffect, useState } from 'react';
import useRequest from '@/temp/request/useRequest';
import getControls from '../utils/controls';

const useRegionTruckTypeForm = ({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm = () => {},
}) => {
	let typekey = 'truck_types';
	if (frieghtType === 'trailer_freight') {
		typekey = 'trailer_types';
	} else if (frieghtType === 'haulage_freight') {
		typekey = 'haulage_types';
	}

	const [componentLoading, setComponentLoading] = useState(true);

	const { state, setState } = props;

	const apiName =
		serviceType === 'buyServices'
			? '/update_channel_partner_buy_services'
			: '/update_channel_partner_sell_services';

	const updateChannelPartnerServicesApi = useRequest(
		'post',
		false,
		'partner',
	)(apiName);

	const getChannelPartnerBuyServicesApi = useRequest(
		'get',
		false,
		'partner',
	)('/get_channel_partner_buy_services');

	const controls = getControls({ frieghtType });

	const { handleSubmit, fields, formState, setValues } = useFormCogo(controls);

	const onSubmit = async (values = {}) => {
		try {
			const payload = {
				id: state?.partnerId,
				service: frieghtType,
				[frieghtType]: {
					serviceable_location_ids: values.select_state,
					[typekey]: values.truck_type,
				},
			};

			await updateChannelPartnerServicesApi.trigger({ data: payload });

			setState((previousState) => ({
				...previousState,
				tradeLanes: {
					...previousState?.tradeLanes,
					[serviceType]: {
						...previousState?.tradeLanes?.[serviceType],
						completedFrieghtTypes: {
							...previousState?.tradeLanes?.[serviceType]
								?.completedFrieghtTypes,
							[frieghtType]: true,
						},
					},
				},
			}));

			setShowServicesForm((previousState) => {
				return {
					...previousState,
					[serviceType]: {
						...previousState[serviceType],
						[frieghtType]: false,
					},
				};
			});

			toast.success('Data saved successfully!');
		} catch (error) {
			toast.error(error.data);
		}
	};

	useEffect(() => {
		const getChannelPartnerBuyServices = async () => {
			try {
				setComponentLoading(true);

				const response = await getChannelPartnerBuyServicesApi.trigger({
					params: {
						id: state.partnerId,
						service: frieghtType,
					},
				});

				const { serviceable_location_ids = [], [typekey]: truck_type = [] } =
					response.data?.[frieghtType] || {};

				setValues({
					select_state: serviceable_location_ids,
					truck_type,
				});

				setComponentLoading(false);
			} catch (error) {
				toast.error(error.data);
			}
		};

		getChannelPartnerBuyServices();
	}, []);

	return {
		errors: formState.errors,
		controls,
		fields,
		handleSubmit,
		onSubmit,
		componentLoading,
		LoadingUpdateChannelPartner: updateChannelPartnerServicesApi?.loading,
	};
};

export default useRegionTruckTypeForm;
