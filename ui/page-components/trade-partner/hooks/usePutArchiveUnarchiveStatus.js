import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const usePutArchiveUnarchiveStatus = ({ archived, getList }) => {
	const { profile } = useSelector((s) => s);

	const [{ loading }, archivedTrigger] = useRequestBf({
		url     : '/saas/organization/archive',
		authKey : 'put_saas_organization_archive',
		method  : 'put',
	}, { manual: true });

	const [unarchiveTrigger] = useRequestBf({
		url     : '/saas/organization/unarchive',
		authKey : 'put_saas_organization_unarchive',
		method  : 'put',
	}, { manual: true });

	const api = archived ? unarchiveTrigger : archivedTrigger;
	const tradePartyStatus = async (itemData) => {
		try {
			const res = await api({
				params: {
					partnerId   : itemData?.saasPartnerId,
					performedBy : profile?.id,
				},
			});
			if (res?.data?.message === 'Success') {
				Toast.success(archived ? 'Unarchived Successfully' : 'Archived Successfully', {
					autoClose : 2000,
					style     : { color: 'black' },
				});
				getList({});
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return { tradePartyStatus, statusLoading: loading };
};
export default usePutArchiveUnarchiveStatus;
