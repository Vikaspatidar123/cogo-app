import { Toast } from '@cogoport/components';

import formatLocations from '../utils/formatLocations';
import formatPayload from '../utils/formatPayload';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateRfqDraft = ({
	draftFormData = {},
	originDetails = {},
	destinationDetails = {},
	setDraftFormData = () => {},
	editForm = '',
	setEditForm = () => {},
	getRfq,
}) => {
	const {
		general: { scope = '', query: { org_id = '', branch_id = '' } = {} },
		profile: { id: userId = '' },
	} = useSelector((state) => state);

	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/update_rfq_draft',
	}, { manual: true });

	const updateRfqDraft = async ({
		formData = {},
		serviceType = '',
		importerExporterDetails = {},
		id = '',
		index,
		status = 'draft',
		services,
		originData,
		destinationData,
	}) => {
		try {
			const Payload = {
				performed_by_id   : userId,
				performed_by_type : scope === 'app' ? 'user' : 'agent',
				status,
				importer_exporter_id:
					scope === 'app' ? org_id : importerExporterDetails?.id,
				importer_exporter_branch_id:
					scope === 'app' ? branch_id : importerExporterDetails?.branch_id,
				rfq_id      : draftFormData?.rfq_id || '',
				user_id     : scope === 'app' ? userId : importerExporterDetails?.user_id,
				draft_id    : draftFormData?.formData?.[serviceType]?.draft_id || '',
				id,
				rfq_name    : importerExporterDetails?.rfqName,
				rfq_type    : importerExporterDetails?.rfqType,
				search_type : serviceType,
				preferred_operator_ids:
					formData?.search_rates?.[0]?.remarks?.[0]?.[
						serviceType === 'air_freight'
							? 'preferred_air_lines'
							: 'preferred_shipping_lines'
					],
				excluded_operator_ids:
					formData?.search_rates?.[0]?.remarks?.[0]?.[
						serviceType === 'air_freight'
							? 'excluded_air_lines'
							: 'excluded_shipping_lines'
					],
				min_origin_detention: Number(
					formData?.search_rates?.[0]?.remarks?.[0]?.min_origin_detention,
				),
				min_origin_demurrage: Number(
					formData?.search_rates?.[0]?.remarks?.[0]?.min_origin_demurrage,
				),
				min_destination_detention: Number(
					formData?.search_rates?.[0]?.remarks?.[0]?.min_destination_detention,
				),
				min_destination_demurrage: Number(
					formData?.search_rates?.[0]?.remarks?.[0]?.min_destination_demurrage,
				),
				preferred_price: Number(
					formData?.search_rates?.[0]?.remarks?.[0]?.price?.price,
				),
				preferred_price_currency:
					formData?.search_rates?.[0]?.remarks?.[0]?.price?.currency,
				search_params: formatPayload({
					formData,
					serviceType,
					services,
					originData,
					destinationData,
				}),
				location_data: formatLocations({
					originDetails,
					destinationDetails,
					serviceType,
					originPortId:
						formData?.search_rates?.[0]?.origin_port_id
						|| formData?.search_rates?.[0]?.origin_airport_id,
					destinationPortId:
						formData?.search_rates?.[0]?.destination_port_id
						|| formData?.search_rates?.[0]?.destination_airport_id,
				}),
			};

			const res = await trigger({
				data: Payload,
			});
			if (status === 'inactive') {
				await getRfq(draftFormData?.rfq_id);
				Toast.success('Deleted Successfully !!');
				return;
			}
			const newDraftFormData = [
				...(draftFormData?.formData?.[serviceType]?.data || []),
			];
			newDraftFormData[index] = {
				...formData,
				id: res.data.id,
			};
			if (editForm === newDraftFormData[index].id) {
				setEditForm('');
			}
			Toast.success('Successfully Updated !!');

			setDraftFormData({
				...draftFormData,
				formData: {
					...draftFormData?.formData,
					[serviceType]: {
						...draftFormData?.formData?.[serviceType],
						data: newDraftFormData,
					},
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};

	return {
		updateLoading: loading || false,
		data,
		updateRfqDraft,
	};
};

export default useUpdateRfqDraft;
