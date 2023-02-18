import { Toast } from '@cogoport/components';

import request from '../../../common/utils/request';

const prepareFilters = () => {
	const finalFilters = {};

	return finalFilters;
};

const fetchLocations = async (inputValue, callback, scope) => {
	try {
		const res = await request({
			scope,
			method : 'get',
			url    : '/list_locations',
			params : {
				filters: {
					status : 'active',
					q      : inputValue || undefined,
					type   : 'airport',
				},
				page_limit : 20,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, main_ports: null },
			},
		});
		const { hasError } = res || {};
		if (hasError) throw new Error();

		let { data } = res;
		data = (data?.list || []).map((item) => ({
			label : item.display_name,
			value : item.id,
		}));

		callback(data);
	} catch (err) {
		Toast.error("Couldn't fetch locations. Please try again later.");
	}
};

export { prepareFilters, fetchLocations };
