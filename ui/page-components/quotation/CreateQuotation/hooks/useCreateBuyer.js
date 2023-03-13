import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateBuyer = () => {
	const { id: userId } = useSelector((state) => state.profile);
	const [{ loading, data: resp }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/organization/buyer',
		authKey : 'post_saas_organization_buyer',
	}, { manual: true });

	const createBuyerAddress = async (data) => {
		const { partnerOrganizationType, partnerOrganizationId, organizationId, ...rest } = data || {};
		try {
			await trigger({
				data: {
					performedBy             : userId,
					organizationId,
					partnerOrganizationId,
					partnerOrganizationType,
					saasOrganizationDetails : {
						...rest,
					},
				},
			});
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		createBuyerAddress,
		loading,
		resp,
	};
};

export default useCreateBuyer;
