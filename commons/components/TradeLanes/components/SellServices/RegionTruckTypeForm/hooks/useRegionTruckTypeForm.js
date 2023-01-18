import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components';
import { useEffect, useState } from 'react';
import useRequest from '@/temp/request/useRequest';
import { useSelector } from '@cogoport/front/store';
import Controls from '../configurations';

const useRegionTruckTypeForm = ({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm = () => {},
}) => {
	const { profile } = useSelector((state) => state);

	const [componentLoading, setComponentLoading] = useState(true);
	const [addedTradeLanesArray, setAddedTradeLanesArray] = useState([]);

	const updateOrganizationServicesApi = useRequest(
		'post',
		false,
		'partner',
	)('/update_organization_service');

	const getOrganizationServicesApi = useRequest(
		'get',
		false,
		'partner',
	)('/get_organization_services');

	const controls = Controls[frieghtType];

	const { handleSubmit, fields, formState, setValues } = useFormCogo(controls);

	const getOrganizationServices = async () => {
		try {
			setComponentLoading(true);

			const response = await getOrganizationServicesApi.trigger({
				params: {
					organization_id: profile?.partner?.twin_service_provider_id,
				},
			});

			const getApiList = response.data?.[frieghtType] || [];

			const defaultListAddedTradeLanes = getApiList?.service_expertise?.map(
				(item) => {
					return {
						mapping_id: item?.id,
						origin_id: item?.origin_location?.id,
						destination_id: item?.destination_location?.id,
						teu: item?.total_teus,
					};
				},
			);

			const locationsFill = getApiList?.service_expertise?.map((val) => {
				return {
					origin_location_id: val?.origin_location?.id,
					destination_location_id: val?.destination_location?.id,
					total_teus: val?.total_teus,
				};
			});

			const truckFill = getApiList?.service_data?.truck_types;
			const cargoFill = getApiList?.service_data?.cargo_types;

			const modesFill = getApiList?.service_data?.modes;

			if (locationsFill?.length > 0) {
				setValues({
					location_pairs: locationsFill,
				});
			}

			if (cargoFill?.length > 0) {
				setValues({
					cargo_types: cargoFill,
				});
			}

			if (truckFill?.length > 0) {
				setValues({
					truck_types: truckFill,
				});
			}

			if (modesFill?.length > 0) {
				setValues({
					modes: modesFill,
				});
			}

			setAddedTradeLanesArray(defaultListAddedTradeLanes);
			setComponentLoading(false);
		} catch (error) {
			toast.error(error.data);
		}
	};

	const onSubmit = async (values = {}) => {
		try {
			const payload = {
				organization_id: profile?.partner?.twin_service_provider_id,
				service: frieghtType,
				service_data: {
					location_pairs: values?.location_pairs,
					truck_types: values?.truck_types || undefined,
					cargo_types: values?.cargo_types || undefined,
					modes: values?.modes || undefined,
				},
			};

			await updateOrganizationServicesApi.trigger({ data: payload });
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
			getOrganizationServices();
		} catch (error) {
			if (error?.error) {
				toast.error(error?.error?.message);
			}
			toast.error(error?.data);
		}
	};

	useEffect(() => {
		getOrganizationServices();
	}, []);

	useEffect(() => {
		props.setState((previousState) => ({
			...previousState,
			tradeLanes: {
				...previousState?.tradeLanes,
				[serviceType]: {
					...previousState?.tradeLanes?.[serviceType],
					completedFrieghtTypes: {
						...previousState?.tradeLanes?.[serviceType]?.completedFrieghtTypes,
						[frieghtType]: addedTradeLanesArray?.length > 0,
					},
				},
			},
		}));
	}, [addedTradeLanesArray]);

	return {
		errors: formState.errors,
		controls,
		fields,
		handleSubmit,
		onSubmit,
		componentLoading,
		LoadingUpdateChannelPartner: updateOrganizationServicesApi?.loading,
	};
};

export default useRegionTruckTypeForm;
