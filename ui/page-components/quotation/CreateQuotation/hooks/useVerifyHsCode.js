import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useVerifyHsCode = () => {
	const { id: userId } = useSelector((state) => state.profile);

	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/trade-engine/hs-engine',
		authKey : 'post_saas_trade_engine_hs_engine',
	}, { manual: true });
};

export default useVerifyHsCode;
