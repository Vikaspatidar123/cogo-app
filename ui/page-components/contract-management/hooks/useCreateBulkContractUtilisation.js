import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateBulkContractUtilisation = ({
	requestedContainerCount,
	getShipmentPlans = () => {},
	isEditPlan,
	freqCount,
	getServiceDetails = () => {},
}) => {
	const { query } = useRouter();
	const { through = '' } = query || {};

	const {
		profile: { id: userId = '', session_type: userType = '' },
	} = useSelector((state) => state);

	const api = isEditPlan
		? '/update_bulk_contract_service_utilisations'
		: '/create_bulk_contract_utilisation';

	const [{ loading }, trigger] = useRequest({
		url    : { api },
		method : 'post',
	}, { manual: true });

	const createBulkContractUtilisation = async ({
		data = {},
		frequency,
		schedule,
		setShowModal,
		serviceId,
		serviceType,
	}) => {
		const { create_plan = [] } = data;
		let newutilizations = [];

		create_plan.forEach((item) => {
			const { id = '', date_range = {}, max_count = '' } = item || {};
			newutilizations = [
				...newutilizations,
				{
					max_count,
					validity_start : date_range?.startDate,
					validity_end   : date_range?.endDate,
					id             : id || undefined,
				},
			];
		});

		const getMaxContainers = (d) => Number(d?.max_count);
		const getValidity = (v) => v.validity_start;
		let totalContainers = 0;
		let validity = 0;
		newutilizations?.forEach((el) => {
			totalContainers += getMaxContainers(el);
			validity += getValidity(el);
		});

		if (freqCount === '' && frequency === '') {
			Toast.error('Please select shipment frequency');
			return;
		}
		if (schedule === '') {
			Toast.error('Please select frequency distribution');
			return;
		}
		if (!validity) {
			Toast.error('Please select date');
			return;
		}
		if (totalContainers > requestedContainerCount) {
			Toast.error('You cannot exceed total container limit');
			return;
		}

		try {
			const payload = {
				performed_by_id        : userId,
				performed_by_type      : userType,
				contract_service_id    : serviceId,
				booking_frequency_days : frequency === 'others' ? freqCount : frequency,
				booking_schedule_type  : schedule,
				utilisations           : newutilizations,
				service_type           : serviceType,
				source                 : through === 'techops' ? 'tech_ops' : undefined,
			};

			await trigger({
				data: payload,
			});
			setShowModal(false);
			Toast.success(
				`Plan ${isEditPlan ? 'updated' : 'created'} successfully !!`,
			);

			await getServiceDetails();
			await getShipmentPlans(serviceId, serviceType);
		} catch (err) {
			if (err?.error?.message) {
				Toast.error(err?.error?.message);
			} else {
				Toast.error(getApiErrorString(err?.data));
			}
		}
	};

	return {
		createBulkContractUtilisation,
		loading,
	};
};
export default useCreateBulkContractUtilisation;
