import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateDsr = () => {
	const { general, profile } = useSelector((s) => s);

	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_dsr',
		method : 'post',
	}, { manual: true });

	const createDsr = async (pocId) => {
		try {
			const requestData = {
				trade_contact_id       : pocId,
				created_by             : profile.id,
				organization_id        : profile.organization.id,
				organization_branch_id : general?.query?.branch_id,
			};
			const res = await trigger({ data: requestData });
			const { data } = res;
			return data;
		} catch (err) {
			Toast.error(err?.message || 'Unable to create status report. Please try again.');
			return null;
		}
	};

	return [loading, createDsr];
};

export default useCreateDsr;
