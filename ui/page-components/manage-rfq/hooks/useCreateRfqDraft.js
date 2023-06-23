import { Toast } from '@cogoport/components';

import getApiErrorString from '../helpers/getApiErrorString';
import formatLocations from '../utils/formatLocations';
import formatPayload from '../utils/formatPayload';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateRfqDraft = ({
	draftFormData,
	originDetails,
	destinationDetails,
	setDraftFormData = () => {},
	formProps,
	setShowForm = () => {},
	importerExporterDetails,
}) => {
	const {
		general: { query: { org_id = '', branch_id = '' } = {} },
		profile: { id: userId = '' },
	} = useSelector((state) => state);

	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/create_rfq_draft',
	}, { manual: true });

	const createRfqDraft = async (
		formData,
		serviceType,
		services,
		originData,
		destinationData,
	) => {
		const { reset = () => {} } = formProps[serviceType] || {};

		try {
			const Payload = {
				performed_by_id             : userId,
				performed_by_type           : 'user',
				status                      : 'draft',
				importer_exporter_id        : org_id,
				importer_exporter_branch_id : branch_id,
				user_id                     : userId,
				draft_id                    : draftFormData?.formData?.[serviceType]?.draft_id || '',
				rfq_id                      : draftFormData?.rfq_id || '',
				rfq_name                    : importerExporterDetails?.rfqName,
				rfq_type                    : importerExporterDetails?.rfqType,
				search_type                 : serviceType,
				preferred_operator_ids:
					formData?.search_rates?.[0]?.remarks?.[0]?.[
						serviceType === 'air_freight'
							? 'preferred_air_lines'
							: 'preferred_shipping_lines'
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
				excluded_operator_ids:
					formData?.search_rates?.[0]?.remarks?.[0]?.[
						serviceType === 'air_freight'
							? 'excluded_air_lines'
							: 'excluded_shipping_lines'
					],
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
			setShowForm('');
			reset();
			Toast.success('Successfully Saved !!');

			setDraftFormData({
				formData: {
					...draftFormData?.formData,
					[serviceType]: {
						data: [
							...(draftFormData?.formData?.[serviceType]?.data || []),
							{
								...formData,
								id: res.data.id,
							},
						],
						draft_id: res.data.draft_id,
					},
				},
				serviceType: !(draftFormData?.serviceType || []).includes(serviceType)
					? [...(draftFormData?.serviceType || []), serviceType]
					: [...(draftFormData?.serviceType || [])],
				rfq_id: res.data.rfq_id,
			});
		} catch (err) {
			console.log(err, 'err');
			Toast.error(getApiErrorString(err?.data));
		}
	};

	return {
		createLoading: loading || false,
		data,
		createRfqDraft,
	};
};

export default useCreateRfqDraft;
