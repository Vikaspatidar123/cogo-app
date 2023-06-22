import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';

const useDeleteTradeParty = ({ getList }) => {
	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/organization/partner',
		authKey : 'delete_saas_organization_partner',
		method  : 'delete',
	}, { manual: false });

	const deleteTradeParty = async ({ itemData, setDeleteModal }) => {
		try {
			const res = await trigger({
				params: {
					id: itemData?.saasPartnerId,
				},
			});
			if (res?.data?.message === 'Success') {
				setDeleteModal(false);
				Toast.success('Deleted Sucessfully');
				getList({});
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return { deleteTradeParty, deleteLoading: loading };
};
export default useDeleteTradeParty;
