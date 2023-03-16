import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
// import { useSelector } from '@/packages/store';

function useAddDetention({ shipment_info, trackerDetails, setTrackerDetails, handleModal }) {
	// const { profile } = useSelector((s) => s);
	// const { general } = useSelector((s) => s);
	const {
		origin_detention,
		destination_detention,
		destination_demurrage,
		combined_destination_detention,
	} = shipment_info || {};
	const processValue = (val) => {
		if (val) {
			return val;
		}
		return 0;
	};
	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_shipment_details',
		method : 'post',
	}, { manual: true });
	const onSubmit = async (values) => {
		let requestData = {};
		requestData = {
			saas_container_subscription_id : trackerDetails.id,
			...shipment_info,
			origin_detention               : processValue(values.origin_detention),
			destination_detention          : processValue(values.destination_detention),
			destination_demurrage          : processValue(values.destination_demurrage),
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
			// setLoading(false);
			handleModal();
		} catch (err) {
			Toast.error("Couldn't add shipment details", err);
			// setLoading(false);
		}
	};

	return {
		loading,
		onSubmit,
	};
}

export default useAddDetention;
