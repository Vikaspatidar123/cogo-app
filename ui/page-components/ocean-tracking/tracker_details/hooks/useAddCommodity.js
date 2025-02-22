import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

function useAddCommodity({ trackerDetails, setTrackerDetails, handleModal }) {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_shipment_details',
		method : 'post',
	}, { manual: true });
	const onSubmit = async (values) => {
		if (values?.label) {
			let requestData = {};
			requestData = {
				saas_container_subscription_id : trackerDetails?.id,
				hsc_code                       : values?.hsc_code,
				commodity                      : values?.label,
			};

			try {
				const res = await trigger({ data: requestData });
				const { hasError } = res || {};
				if (hasError) throw new Error();

				const { data } = res;
				const updatedTrackerDetails = {
					...trackerDetails,
					shipment_info: data,
				};

				setTrackerDetails(updatedTrackerDetails);
				handleModal();
			} catch (err) {
				Toast.error("Couldn't add shipment details", err);
			}
		}
	};

	return {
		loading,
		onSubmit,
	};
}

export default useAddCommodity;
