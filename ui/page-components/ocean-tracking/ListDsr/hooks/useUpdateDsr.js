import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpdateDsr = (setDsrs) => {
	// const [loading, setLoading] = useState(false);
	// const { dsrs, general, setDsrs } = useSaasState();
	// const { scope } = general;
	// const [shipments, setShipments] = useState([]);
	const { general, profile } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'update_saas_dsr',
		method : 'post',
	}, { manual: true });
	const updateDsr = async (dsrId, status) => {
		try {
			// setLoading(true);

			const requestData = {
				dsr_id: dsrId,
				status,
			};

			const res = await trigger({ data: requestData });
			// setLoading(false);
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			setDsrs((dsrs) => dsrs.map((item) => {
				if (item.id === dsrId) {
					return { ...item, status: status ? 'active' : 'inactive' };
				}
				return item;
			}));
		} catch (err) {
			Toast.error(err?.message || 'Unable to update status report. Please try again.');
			// setLoading(false);
		}
	};

	return { loading, updateDsr };
};

export default useUpdateDsr;
