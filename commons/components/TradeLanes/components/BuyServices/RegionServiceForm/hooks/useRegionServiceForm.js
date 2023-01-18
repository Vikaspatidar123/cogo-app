import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components';
import useRequest from '@/temp/request/useRequest';
import getControls from '../utils/controls';

const useRegionServiceForm = ({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm,
}) => {
	const { state = {}, setState = () => {} } = props;

	const [componentLoading, setComponentLoading] = useState(false);

	const apiName =
		serviceType === 'buyServices'
			? '/update_channel_partner_buy_services'
			: '/update_channel_partner_sell_services';

	const updateChannelPartnerServicesApi = useRequest(
		'post',
		false,
		'partner',
	)(apiName);

	const getApiName =
		serviceType === 'buyServices'
			? 'get_channel_partner_buy_services'
			: 'get_channel_partner_sell_services';

	const getChannelPartnerBuyServicesApi = useRequest(
		'get',
		false,
		'partner',
	)(`/${getApiName}`);

	const controls = getControls({ frieghtType });

	const { handleSubmit, setValues, fields, watch, formState } =
		useFormCogo(controls);

	const watchValues = watch();

	useEffect(() => {
		if (!watchValues.specializedService.includes('import')) {
			setValues({
				select_import_region: [],
			});
		}
		if (!watchValues.specializedService.includes('export')) {
			setValues({
				select_export_region: [],
			});
		}
	}, [watchValues.specializedService]);

	const showElements = controls.reduce((previousControls, currentControls) => {
		const { name = '' } = currentControls;

		let showElement = false;
		if (name === 'specializedService') {
			showElement = true;
		}
		if (
			name === 'select_import_region' &&
			watchValues.specializedService.includes('import')
		) {
			showElement = true;
		}
		if (
			name === 'select_export_region' &&
			watchValues.specializedService.includes('export')
		) {
			showElement = true;
		}

		return {
			...previousControls,
			[name]: showElement,
		};
	}, {});

	const onSubmit = async (values = {}) => {
		try {
			const payload = {
				id: state.partnerId,
				service: frieghtType,
				[frieghtType]: {
					import_serviceable_location_ids:
						values?.select_import_region || undefined,
					export_serviceable_location_ids:
						values?.select_export_region || undefined,
				},
			};

			await updateChannelPartnerServicesApi.trigger({
				data: payload,
			});

			toast.success('Data saved successfully !');

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

				const {
					trade_types = [],
					import_serviceable_location_ids = [],
					export_serviceable_location_ids = [],
				} = response.data?.[frieghtType] || {};

				setValues({
					specializedService: trade_types,
					select_import_region: import_serviceable_location_ids,
					select_export_region: export_serviceable_location_ids,
				});

				setComponentLoading(false);
			} catch (error) {
				toast.error(error.data);
			}
		};

		getChannelPartnerBuyServices();
	}, []);

	return {
		controls,
		fields,
		errors: formState.errors,
		handleSubmit,
		onSubmit,
		showElements,
		componentLoading,
		loading: updateChannelPartnerServicesApi?.loading,
	};
};

export default useRegionServiceForm;
