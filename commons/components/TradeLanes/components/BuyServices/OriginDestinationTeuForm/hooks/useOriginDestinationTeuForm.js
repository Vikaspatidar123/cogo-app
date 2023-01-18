import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components';
import useRequest from '@/temp/request/useRequest';

import getControls from '../controls';
import useGetDefaultTradeLanes from './useGetDefaultTradeLanes';
import FRIEGHT_KEY_MAPPING from './frieghtMappingConfig';

const TEU_VALUE_MAPPING = {
	buyServices: {
		'0-50': { lowerLimit: 0, upperLimit: 50 },
		'50-100': { lowerLimit: 50, upperLimit: 100 },
		'100-500': { lowerLimit: 100, upperLimit: 500 },
		'500-1000': { lowerLimit: 500, upperLimit: 1000 },
		'1000+': { lowerLimit: 1000, upperLimit: 1000000 },
	},
};

const useOriginDestinationTeuForm = ({
	props,
	serviceType = '',
	frieghtType = '',
}) => {
	const [errors, setErrors] = useState({});

	const updateChannelPartnerServicesApi = useRequest(
		'post',
		false,
		'partner',
	)('/update_channel_partner_buy_services');

	const updateOrganizationTradeServiceMappingStatusApi = useRequest(
		'post',
		false,
		'partner',
	)('/update_organization_trade_service_mapping_status');

	const { state, setState } = props;

	const [addedTradeLanesArray, setAddedTradeLanesArray] = useState([]);

	const {
		fetchGetChannelPartnerBuyServicesApi = () => {},
		loadingGetPartnerUser = false,
	} = useGetDefaultTradeLanes({
		state,
		serviceType,
		frieghtType,
		setAddedTradeLanesArray,
	});

	const controls = getControls({
		serviceType,
		frieghtType,
	});

	const { handleSubmit, fields, setValues, formState } = useFormCogo(controls);

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

	const onSubmit = async ({ values = {} }) => {
		try {
			if (values.origin === values.destination) {
				toast.error('Origin and Destination cannot be same');
				return;
			}

			const payload = {
				id: state.partnerId,
				service: frieghtType,
				[frieghtType]: [
					{
						origin_location_id: values.origin,
						destination_location_id: values.destination,
						[FRIEGHT_KEY_MAPPING[frieghtType].lowerLimit]:
							TEU_VALUE_MAPPING[serviceType][values?.teu].lowerLimit,
						[FRIEGHT_KEY_MAPPING[frieghtType].upperLimit]:
							TEU_VALUE_MAPPING[serviceType][values?.teu].upperLimit,
						[FRIEGHT_KEY_MAPPING[frieghtType].unit]: 'month',
					},
				],
			};

			await updateChannelPartnerServicesApi.trigger({
				data: payload,
			});

			toast.success('Data saved successfully!');

			fetchGetChannelPartnerBuyServicesApi();

			setValues({
				origin: '',
				destination: '',
				teu: '',
			});
		} catch (error) {
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
						[frieghtType]: addedTradeLanesArray.length !== 0,
					},
				},
			},
		}));
	}, [addedTradeLanesArray]);

	const onClickDeleteIcon = async ({ index }) => {
		try {
			const payload = {
				id: addedTradeLanesArray[index].mapping_id,
				status: 'inactive',
			};

			await updateOrganizationTradeServiceMappingStatusApi.trigger({
				data: payload,
			});

			fetchGetChannelPartnerBuyServicesApi();
		} catch (error) {
			toast.error(error.data);
		}
	};

	return {
		controls,
		fields,
		errors,
		handleSubmit,
		onSubmit,
		addedTradeLanesArray,
		onClickDeleteIcon,
		loading: updateChannelPartnerServicesApi?.loading,
		loadingGetPartnerUser,
		loadingDeleteIcon: updateOrganizationTradeServiceMappingStatusApi?.loading,
	};
};

export default useOriginDestinationTeuForm;
