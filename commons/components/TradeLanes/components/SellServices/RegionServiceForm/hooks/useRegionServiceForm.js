import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components';
import useRequest from '@/temp/request/useRequest';
import { useSelector } from '@cogoport/front/store';
import Controls from '../configurations';

const useRegionServiceForm = ({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm,
}) => {
	const { profile } = useSelector((state) => state);
	const {
		profile: { partner },
	} = useSelector((state) => state);
	const [addedTradeLanesArray, setAddedTradeLanesArray] = useState([]);

	const { setState = () => {} } = props;

	const [componentLoading, setComponentLoading] = useState(false);

	const updateOrganizationServicesApi = useRequest(
		'post',
		false,
		'partner',
	)('/update_organization_service');

	const getOrganizationServicesApi = useRequest(
		'get',
		false,
		'partner',
	)(`/get_organization_services`);

	const controls = Controls[frieghtType];

	const { handleSubmit, setValues, fields, formState } = useFormCogo(controls);
	const getOrganizationServices = async () => {
		try {
			setComponentLoading(true);

			const response = await getOrganizationServicesApi.trigger({
				params: {
					organization_id: partner?.twin_service_provider_id,
					service: frieghtType,
				},
			});

			const getApiList = response.data?.[frieghtType] || [];
			const defaultListAddedTradeLanes = getApiList?.service_expertise?.map(
				(element) => {
					return {
						mapping_id: element.id,
						trade_type: element.trade_type,
						location_id: element.location_id,
					};
				},
			);

			setAddedTradeLanesArray(defaultListAddedTradeLanes);
			const locationsFill = getApiList?.service_expertise?.map((val) => {
				return {
					location_id: val?.location?.id,
					trade_type: val?.trade_type,
					total_teus: val?.total_teus,
				};
			});
			const cargoFill = getApiList?.service_data?.cargo_types;

			if (locationsFill?.length > 0) {
				setValues({
					locations: locationsFill,
				});
			}
			if (cargoFill?.length > 0) {
				setValues({
					cargo_types: cargoFill,
				});
			}

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
					locations: values.locations,
					cargo_types: values.cargo_types,
				},
			};

			await updateOrganizationServicesApi.trigger({
				data: payload,
			});

			toast.success('Data saved successfully !');
			getOrganizationServices();
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
		setState((previousState) => ({
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
		controls,
		fields,
		errors: formState.errors,
		handleSubmit,
		onSubmit,
		componentLoading,
		loading: updateOrganizationServicesApi?.loading,
	};
};

export default useRegionServiceForm;
