import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const SERVICE_ID_INDEX = 1;

const mergeAndTransformData = (data) => data.create_plan.reduce((acc, curr) => {
	const { date_range, sub_create_plan } = curr;

	const { startDate, endDate } = date_range;

	return [
		...acc,
		...sub_create_plan.map((item) => {
			const { id, vessel_select, max_count } = item;

			return {
				contract_service_id : vessel_select.split('_')[SERVICE_ID_INDEX],
				max_count,
				validity_end        : new Date(endDate).toISOString(),
				validity_start      : new Date(startDate).toISOString(),
				id                  : id || undefined,
				status              : 'active',
			};
		}),
	];
}, []);

const finalMergeAndTransformData = ({ oldData, newData }) => {
	const allNewIds = newData.map((item) => item.id);

	const inactiveItems = oldData.reduce((acc, item) => {
		const { id = '' } = item;

		if (allNewIds.includes(id)) {
			return acc;
		}

		return [...acc, { ...item, status: 'inactive' }];
	}, []);

	return [...newData, ...inactiveItems];
};
const useCreateBulkContractUtilisation = ({

	getShipmentPlans = () => { },
	isEditPlan,
	freqCount,
	getServiceDetails = () => { },
	planData,
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
		url    : api,
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

		if (freqCount === '' && frequency === '') {
			Toast.error('Please select shipment frequency');
			return;
		}

		if (schedule === '') {
			Toast.error('Please select frequency distribution');
			return;
		}

		try {
			const payload = {
				performed_by_id        : userId,
				performed_by_type      : userType,
				booking_frequency_days : frequency === 'others' ? freqCount : frequency,
				booking_schedule_type  : schedule,
				utilisations           : finalMergeAndTransformData({
					oldData : planData,
					newData : mergeAndTransformData(data),
				}),
				service_type : serviceType,
				source       : through === 'techops' ? 'tech_ops' : undefined,
			};

			await trigger({
				data: payload,
			});
			setShowModal(false);
			Toast.success(
				`Plan ${isEditPlan ? 'updated' : 'created'} successfully !!`,
			);

			getServiceDetails();
			getShipmentPlans(serviceId, serviceType);
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
