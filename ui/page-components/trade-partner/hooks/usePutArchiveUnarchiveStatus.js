import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getPayload = ({ itemData, profile }) => ({
	partnerId   : itemData?.saasPartnerId,
	performedBy : profile?.id,
});

const usePutArchiveUnarchiveStatus = ({ archived, getList, setArchive }) => {
	const { t } = useTranslation(['common', 'tradePartner']);

	const { profile } = useSelector((s) => s);

	const [{ loading }, archivedTrigger] = useRequestBf(
		{
			url     : '/saas/organization/archive',
			authKey : 'put_saas_organization_archive',
			method  : 'put',
		},
		{ manual: true },
	);

	const [{ loading:archiveLoading }, unarchiveTrigger] = useRequestBf(
		{
			url     : '/saas/organization/unarchive',
			authKey : 'put_saas_organization_unarchive',
			method  : 'put',
		},
		{ manual: true },
	);

	const api = archived ? unarchiveTrigger : archivedTrigger;
	const tradePartyStatus = async (itemData) => {
		const payload = getPayload({ itemData, profile });
		try {
			const res = await api({
				params: payload,
			});
			if (res?.data?.message === 'Success') {
				setArchive(false);
				Toast.success(
					archived ? t('tradePartner:trade_partner_toast_4') : t('tradePartner:trade_partner_toast_5'),
					{
						autoClose: 2000,
					},
				);
				getList({});
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return { tradePartyStatus, statusLoading: loading || archiveLoading };
};
export default usePutArchiveUnarchiveStatus;
