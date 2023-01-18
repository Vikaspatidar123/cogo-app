import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components';
import useRequest from '@/temp/request/useRequest';
import getControls from '../utils/controls';
import getExportControls from '../utils/exportFormControl';
import getTileCardControls from '../utils/tileCardControls';
import useGetDefaultValues from './useGetDefaultValues';

const useFclCfsForm = ({
	props,
	serviceType = '',
	frieghtType = '',
	setShowServicesForm = () => {},
}) => {
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

	const updateOrganizationTradeServiceMappingStatusApi = useRequest(
		'post',
		false,
		'partner',
	)('/update_organization_trade_service_mapping_status');

	const [addedTradeLanesArray, setAddedTradeLanesArray] = useState([]);

	const {
		fetchGetChannelPartnerBuyServicesApi = () => {},
		loadingGetPartnerUser = false,
	} = useGetDefaultValues({
		state,
		serviceType,
		frieghtType,
		setAddedTradeLanesArray,
	});

	const tileControls = getTileCardControls();

	const controls = getControls({
		frieghtType,
	});

	const exportControls = getExportControls({
		frieghtType,
	});

	const { fields: fieldsTileControls, watch: watchTileControls } =
		useFormCogo(tileControls);

	const { handleSubmit, fields, setValues, formState } = useFormCogo(controls);

	const {
		handleSubmit: handleSubmitExport,
		fields: fieldsExport,
		setValues: setValuesExport,
		formState: formStateExport,
	} = useFormCogo(exportControls);

	const watchTileControlValues = watchTileControls();

	const onSubmit = async (values = {}) => {
		try {
			const payload = {
				id: state.partnerId,
				service: frieghtType,
				[frieghtType]: [
					{
						trade_type: 'import',
						serviceable_location_id: values.select_import_region,
						is_cfs_agent_present:
							values.is_cfs_agent_present_for_import === 'yes',
					},
				],
			};

			await updateChannelPartnerServicesApi.trigger({
				data: payload,
			});

			setValues({
				select_import_region: '',
				is_cfs_agent_present_for_import: '',
			});

			fetchGetChannelPartnerBuyServicesApi();
		} catch (error) {
			toast.error(error.data);
		}
	};

	const onSubmitExport = async (values = {}) => {
		try {
			const payload = {
				id: state.partnerId,
				service: frieghtType,
				[frieghtType]: [
					{
						trade_type: 'export',
						serviceable_location_id: values.select_export_region,
						is_cfs_agent_present:
							values.is_cfs_agent_present_for_export === 'yes',
					},
				],
			};

			await updateChannelPartnerServicesApi.trigger({
				data: payload,
			});

			setValuesExport({
				select_export_region: '',
				is_cfs_agent_present_for_export: '',
			});

			fetchGetChannelPartnerBuyServicesApi();
		} catch (error) {
			toast.error(error.data);
		}
	};

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

	const onClose = async () => {
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

	return {
		importControls: controls,
		importFields: fields,
		errorsImport: formState.errors,
		handleSubmit,
		onSubmit,
		onSubmitExport,
		addedTradeLanesArray,
		onClose,
		onClickDeleteIcon,
		exportControls,
		handleSubmitExport,
		fieldsExport,
		errorsExport: formStateExport.errors,
		tileControls,
		fieldsTileControls,
		watchTileControlValues,
		loadingGetPartnerUser,
		loadingDeleteButton: updateOrganizationTradeServiceMappingStatusApi.loading,
		loadingAddButton: updateChannelPartnerServicesApi.loading,
	};
};

export default useFclCfsForm;
