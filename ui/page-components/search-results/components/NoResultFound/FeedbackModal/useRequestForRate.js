import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';
import { useRouter } from '@cogo/next';

const useRequestForRate = ({ onClose, reset, details, requestService }) => {
	const {
		general: { query = {}, scope },
	} = useSelector((state) => state);

	const { search_id = '' } = query;
	const Router = useRouter();
	const url = '/create_spot_search_rate_request';

	const { loading, trigger } = useRequest('post', false, scope)(url);

	const onSubmitFeedback = async (values = {}) => {
		const {
			preferred_airline_ids = undefined,
			preferred_freight_rate = undefined,
			preferred_freight_rate_currency = undefined,
			remarks = undefined,
			preferred_shipping_line_ids = undefined,
			cargo_readiness_date = null,
		} = values;
		try {
			if (preferred_freight_rate && !preferred_freight_rate_currency) {
				toast.error('Please add currency');
			} else {
				const body = {
					id: search_id,
					remarks: remarks ? [remarks] : undefined,
					performed_by_org_id: details.importer_exporter.id,
					preferred_shipping_line_ids: preferred_shipping_line_ids || undefined,
					preferred_airline_ids: preferred_airline_ids || undefined,
					preferred_freight_rate: preferred_freight_rate || undefined,

					preferred_freight_rate_currency:
						preferred_freight_rate_currency || undefined,
					cargo_readiness_date,
					service_id: requestService?.service_id || undefined,
					service_type: requestService?.service_type || undefined,
					selected_card: requestService?.selected_card,
				};

				await trigger({
					data: body,
				});
				handleResponse();
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleResponse = () => {
		onClose();
		toast.success('Your request has been submitted');
		if (!requestService) {
			Router.push('/sales/dashboards');
		}
		reset();
	};

	return {
		onSubmitFeedback,
		loading,
	};
};

export default useRequestForRate;
