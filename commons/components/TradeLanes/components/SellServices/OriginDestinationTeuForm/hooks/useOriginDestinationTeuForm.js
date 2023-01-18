import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components';
import useRequest from '@/temp/request/useRequest';
import { useSelector } from '@cogoport/front/store';

import useGetDefaultTradeLanes from './useGetDefaultTradeLanes';
import Controls from '../configurations';

const useOriginDestinationTeuForm = ({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm,
}) => {
	const { profile } = useSelector((state) => state);

	const [errors, setErrors] = useState({});

	const updateOrganizationServices = useRequest(
		'post',
		false,
		'partner',
	)(`/update_organization_service`);

	const { state, setState } = props;

	const [addedTradeLanesArray, setAddedTradeLanesArray] = useState([]);

	const controls = Controls[frieghtType];

	const { handleSubmit, fields, setValues, formState } = useFormCogo(controls);

	const {
		fetchGetOrganizationServices = () => {},
		loadingGetPartnerUser = false,
	} = useGetDefaultTradeLanes({
		state,
		serviceType,
		setValues,
		frieghtType,
		setAddedTradeLanesArray,
	});

	useEffect(() => {
		if (Object.keys(formState.errors).includes('teu')) {
			setErrors({
				...formState.errors,
				teu: {
					type: 'custom',
					message: 'Unit is Required',
				},
			});
		} else {
			setErrors(formState.errors);
		}
	}, [JSON.stringify(formState.errors)]);

	const onSave = () => {
		setShowServicesForm((previousState) => {
			return {
				...previousState,
				[serviceType]: {
					...previousState[serviceType],
					[frieghtType]: false,
				},
			};
		});
	};

	const onSubmit = async (values) => {
		try {
			const payload = {
				organization_id: profile?.partner?.twin_service_provider_id,
				service: frieghtType,
				service_data: {
					location_pairs: values?.location_pairs,
					shipping_lines: values.shipping_lines || undefined,
					airlines: values.airlines || undefined,
					cargo_types: values?.cargo_types,
				},
			};

			await updateOrganizationServices.trigger({
				data: payload,
			});

			toast.success('Data saved successfully!');

			fetchGetOrganizationServices();

			setValues({
				origin: '',
				destination: '',
				teu: '',
			});
			onSave();
		} catch (error) {
			if (error?.error) {
				toast.error(error?.error?.message);
			}
			toast.error(error.data?.base || error.data);
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
		controls,
		fields,
		errors,
		handleSubmit,
		onSubmit,
		addedTradeLanesArray,
		loading: updateOrganizationServices?.loading,
		loadingGetPartnerUser,
	};
};

export default useOriginDestinationTeuForm;
