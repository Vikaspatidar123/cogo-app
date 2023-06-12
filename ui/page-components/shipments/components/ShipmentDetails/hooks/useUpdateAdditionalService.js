import { Toast } from '@cogoport/components';

import { useStakeholderCheck } from '../../../helpers/stakeholderCheck';

import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const stateMapping = {
	is_kam        : 'cancelled',
	is_so1        : 'cancelled_by_supplier',
	is_so2        : 'cancelled_by_supplier',
	is_superadmin : 'cancelled',
};

const useUpdateAdditionalService = ({
	id,
	remarkValues,
	refetch,
	setShowCancel = () => {},
}) => {
	const stakeholder = useStakeholderCheck();

	const role = Object.keys(stakeholder || {})?.find(
		(item) => stakeholder[item] === true,
	);

	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_additional_service',
		method : 'post',
	}, { manual: true });

	const updateServiceList = async () => {
		try {
			const res = await trigger({
				data: {
					id,
					remarks : [remarkValues],
					state   : stateMapping[role] || 'cancelled',
				},
			});

			if (!res.error) {
				Toast.success('Service Removed.');
				refetch();
				setShowCancel(false);
			} else if (res.error) {
				showErrorsInToast(res?.messages);
			}
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		updateServiceList,
		loading,
	};
};

export default useUpdateAdditionalService;
