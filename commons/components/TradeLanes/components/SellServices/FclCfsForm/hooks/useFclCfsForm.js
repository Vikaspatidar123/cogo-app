import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components';
import useRequest from '@/temp/request/useRequest';
import { useSelector } from '@cogoport/front/store';
import FclCfs from '../configurations/fcl-cfs';
import useGetDefaultValues from './useGetDefaultValues';

const useFclCfsForm = ({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm = () => {},
}) => {
	const { profile } = useSelector((state) => state);

	const { state, setState } = props;

	const updateOrganizationServicesApi = useRequest(
		'post',
		false,
		'partner',
	)('/update_organization_service');

	const [addedTradeLanesArray, setAddedTradeLanesArray] = useState([]);

	const { handleSubmit, fields, setValues, formState } = useFormCogo(FclCfs);

	const {
		fetchOrganizationServicesApi = () => {},
		loadingGetPartnerUser = false,
	} = useGetDefaultValues({
		state,
		serviceType,
		setValues,
		frieghtType,
		setAddedTradeLanesArray,
	});

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

			setShowServicesForm((previousState) => {
				return {
					...previousState,
					[serviceType]: {
						...previousState[serviceType],
						[frieghtType]: false,
					},
				};
			});

			fetchOrganizationServicesApi();
		} catch (error) {
			if (error?.error) {
				toast.error(error?.error?.message);
			}
			toast.error(error.data);
		}
	};

	useEffect(() => {
		setState((previousState) => ({
			...previousState,
			tradeLanes: {
				...(previousState.tradeLanes || {}),
				[serviceType]: {
					...(previousState.tradeLanes?.[serviceType] || {}),
					completedFrieghtTypes: {
						...previousState?.tradeLanes?.[serviceType]?.completedFrieghtTypes,
						[frieghtType]: addedTradeLanesArray?.length > 0,
					},
				},
			},
		}));
	}, [addedTradeLanesArray]);

	return {
		FclCfs,
		fields,
		errors: formState.errors,
		handleSubmit,
		onSubmit,
		loadingGetPartnerUser,
	};
};

export default useFclCfsForm;
