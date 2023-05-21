import { Toast } from '@cogoport/components';
import { useEffect, useState, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const SEARCH_TYPES = {
	CONTAINER_NUMBER : 'CONTAINER_NO',
	BOOKING_NUMBER   : 'BOOKING_NO/BL_NO',
	BL_NUMBER        : 'BL_NO',
};

const controls = [
	{ label: 'Booking No / BL No', value: SEARCH_TYPES.BOOKING_NUMBER },
	{ label: 'Container Number', value: SEARCH_TYPES.CONTAINER_NUMBER },
];
const useCreateTracker = ({ query }) => {
	const [value, setValue] = useState({ search_type: '', search_value: undefined, shipping_line_id: '' });
	const [shippingLines, setShippingLines] = useState(null);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_shipping_line_for_container_no',
		method : 'get',
	}, { manual: false });

	const [{ loading:apiloading }, shipping] = useRequest({
		url    : '/get_saas_container_shipping_lines',
		method : 'get',
	}, { manual: false });
	const fetchShippingLineForContainer = async (id) => {
		try {
			const res = await trigger({ params: { container_no: id } });

			const { data } = res;
			if (data?.result?.shipping_line_id) {
				const valueId = data.result.shipping_line_id;
				const label = shippingLines?.filter?.((item) => item.id === value)[0]?.short_name;
				setValue((prv) => ({ ...prv, shipping_line_id: valueId }));
			} else setValue((prv) => ({ ...prv, shipping_line_id: '' }));
		} catch (err) {
			console.log(err);
		}
	};
	const getShippingLines = useCallback(async () => {
		try {
			const res = await shipping();
			setShippingLines(res?.data?.list);
		} catch (err) {
			Toast.error(err?.message || 'No shipping lines found');
		}
	}, [shipping]);
	useEffect(() => {
		getShippingLines();
	}, [getShippingLines]);
	useEffect(() => {
		fetchShippingLineForContainer(query);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return {
		loading: loading || apiloading,
		getShippingLines,
		fetchShippingLineForContainer,
		apiloading,
		value,
		setValue,
		shippingLines,
		controls,
	};
};
export default useCreateTracker;
