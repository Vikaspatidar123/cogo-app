import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useRequestForRate = ({ onClose, reset, details, requestService }) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { search_id = '' } = query;
	const Router = useRouter();

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_spot_search_rate_request',
			method : 'post',
		},
		{ manual: true },
	);

	const handleResponse = () => {
		onClose();
		Toast.success('Your request has been submitted');
		if (!requestService) {
			Router.push('/sales/dashboards');
		}
		reset();
	};

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
				Toast.error('Please add currency');
			} else {
				const body = {
					id                          : search_id,
					remarks                     : remarks ? [remarks] : undefined,
					performed_by_org_id         : details.importer_exporter.id,
					preferred_shipping_line_ids : preferred_shipping_line_ids || undefined,
					preferred_airline_ids       : preferred_airline_ids || undefined,
					preferred_freight_rate      : preferred_freight_rate || undefined,

					preferred_freight_rate_currency:
						preferred_freight_rate_currency || undefined,
					cargo_readiness_date,
					service_id    : requestService?.service_id || undefined,
					service_type  : requestService?.service_type || undefined,
					selected_card : requestService?.selected_card,
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

	return {
		onSubmitFeedback,
		loading,
	};
};

export default useRequestForRate;
