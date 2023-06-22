import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useRemoveService = (service, source) => {
	const { search_id, checkout_id } = useSelector(
		({ general }) => general.query,
	);

	const [{ loading }, trigger] = useRequest({
		url    : source === 'checkout' ? '/update_checkout_service' : '/update_spot_search',
		method : 'post',
	}, { manual: true });

	const handleRemoveService = async () => {
		let serviceName = service.service_type;

		const services = [];

		service.data?.forEach((serviceItem) => {
			const serviceObj = {
				status : 'inactive',
				id     : serviceItem.id,
			};

			if (
				serviceName === 'transportation'
				&& (serviceItem.service_type === 'ftl_freight'
					|| serviceItem.service_type === 'trailer_freight')
			) {
				serviceName = serviceItem.service_type;
			}

			services.push(serviceObj);
		});

		let apiServiceName = serviceName;

		if (serviceName === 'trailer_freight' && source === 'checkout') {
			apiServiceName = 'haulage_freight';
		}

		const params = {
			id                                        : source === 'checkout' ? checkout_id : search_id,
			service                                   : apiServiceName,
			[`${apiServiceName}_services_attributes`] : services,
		};

		try {
			const res = await trigger({
				data    : params,
				headers : {
					authorizationparameters: 'sales_dashboard:allowed',
				},
			});
			Toast.success('Service removed Successfully');

			return res;
		} catch (e) {
			console.log(e);
		}

		return {};
	};

	return {
		loading,
		handleRemoveService,
	};
};

export default useRemoveService;
