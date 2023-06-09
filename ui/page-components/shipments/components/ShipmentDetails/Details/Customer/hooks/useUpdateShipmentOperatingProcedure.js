import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useUpdateShipmentOperatingProcedure = ({
	sopData,
	reload,
	setReload = () => {},
	updatePermission,
}) => {
	const apitoCall = 'update_shipment_operating_procedure';
	const successMessage = `SuccessFully ${
		sopData?.is_pinned ? 'Unpinned' : 'Pinned'
	}`;

	const [{ loading }, trigger] = useRequest({
		url    : apitoCall,
		method : 'post',
	}, { manual: true });
	const upatePinnedStatus = async () => {
		if (!updatePermission) {
			return;
		}
		try {
			const res = await trigger({
				params: {
					procedure_id : sopData?.id,
					data         : { is_pinned: !sopData?.is_pinned },
				},
			});
			if (!res.hasError) {
				Toast.success(successMessage);

				setReload(!reload);
			} else {
				Toast.error('Something went wrong');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return {
		loading,
		upatePinnedStatus,
	};
};

export default useUpdateShipmentOperatingProcedure;
