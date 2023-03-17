import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateDsr = () => {
	// const [loading, setLoading] = useState(false);
	// const { dsrs, general, setDsrs } = useSaasState();
	// const { scope } = general;
	const { general, profile } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_dsr',
		method : 'post',
	}, { manual: true });
	const createDsr = async (pocId) => {
		try {
			// if (showLoading) setLoading(true);
			const requestData = {
				trade_contact_id       : pocId,
				created_by             : profile.id,
				organization_id        : profile.organization.id,
				organization_branch_id : general?.query?.branch_id,
			};
			const res = await trigger({ data: requestData });
			// if (showLoading) setLoading(false);
			// setLoading(false);
			// const { hasError } = res || {};
			// const message = res?.data?.message;
			// if (hasError) throw new Error();
			// if (message) throw new Error(message);

			const { data } = res;
			return data;
		} catch (err) {
			Toast.error(err?.message || 'Unable to create status report. Please try again.');
			// if (showLoading) setLoading(false);
			return null;
		}
	};

	return [loading, createDsr];
};

export default useCreateDsr;
