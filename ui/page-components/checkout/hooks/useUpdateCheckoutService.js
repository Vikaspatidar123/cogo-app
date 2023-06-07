import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useUpdateCheckoutService = ({
	detail,
	checkout_id,
	refetch = () => {},
	servicesCount = 0,
	deleteServiceIP = () => {},
}) => {
	const [{ loading }, updateCheckoutService] = useRequest({
		url    : '/update_checkout_service',
		method : 'post',
	}, { manual: true });

	const handleDeleteRate = async (item) => {
		let service_to_be_deleted = item?.service_type;

		if (
			detail?.primary_service === 'fcl_freight'
			&& service_to_be_deleted === 'trailer_freight'
			&& checkout_id
		) {
			service_to_be_deleted = 'haulage_freight';
		}

		const isSubsidiary = item?.service_type === 'subsidiary';

		const service_type = isSubsidiary
			? 'subsidiary_services_attributes'
			: `${service_to_be_deleted}_services_attributes`;

		try {
			const payload = {
				id             : checkout_id,
				service        : service_to_be_deleted,
				[service_type] : [
					{
						id     : item?.id,
						status : 'inactive',
					},
				],
			};
			const res = await updateCheckoutService({ data: payload });

			if (!res.hasError) {
				Toast.success('Service deleted successfully!');
				await refetch();

				if (servicesCount > 1) { deleteServiceIP({ deleteService: 'cargo_insurance' }); }
			}
		} catch (err) {
			Toast.error('Could not delete Service!');
		}
	};

	return {
		handleDeleteRate,
		deleteRateLoading: loading,
	};
};

export default useUpdateCheckoutService;
