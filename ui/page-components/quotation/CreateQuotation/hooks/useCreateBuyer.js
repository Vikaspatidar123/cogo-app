import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateBuyer = ({ setValue, ref }) => {
	const { id: userId } = useSelector((state) => state.profile);
	const [{ loading, data: resp }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/organization/buyer',
		authKey : 'post_saas_organization_buyer',
	}, { manual: true });
	const { current } = ref;
	const createBuyerAddress = async (data, setOpenModal) => {
		const { partnerOrganizationType, partnerOrganizationId, organizationId, ...rest } = data || {};
		try {
			const res = await trigger({
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
			if (res?.data) {
				current.buyerDetails = res?.data;
				setValue('buyerId', res?.data?.id);
				console.log(res?.data, 'res?.data');
				setOpenModal(false);
				Toast.success('Successfully Create User');
			}
		} catch (err) {
			console.log(err, 'err');
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
