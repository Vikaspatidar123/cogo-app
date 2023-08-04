import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const useGetOrganizationOutstandings = () => {
	const { registration_number, kyc_status } = useSelector(({ profile }) => ({
		registration_number : profile?.organization?.registration_number,
		kyc_status          : profile?.organization?.kyc_status,
	}));

	const isAutoCall = kyc_status === 'verified' && registration_number !== null;
	const params = {
		filters: {
			registration_number: registration_number || undefined,
		},
	};

	const [{ loading, data }] = useRequest({
		url    : '/list_sage_ar_outstandings',
		method : 'get',
		params,
	}, { manual: isAutoCall, autoCancel: true });

	const dataStatsList = data?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return {
		statsList    : dataStatsList,
		statsLoading : loading,
	};
};

export default useGetOrganizationOutstandings;
