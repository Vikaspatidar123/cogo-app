import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import { useSaasState } from '../../../common/context';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useTopProductList = () => {
	const [productList, setProductList] = useState();
	const [period, setPeriod] = useState('MONTH');
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const [{ loading }, trigger] = useRequestBf({
		url     : 'saas/product/top/list',
		method  : 'get',
		authKey : 'get_saas_product_top_list',
	}, { manual: true });

	const fetch = async () => {
		try {
			const resp = await trigger({
				params: {
					organizationId: organization?.id,
					period,
				},
			});
			setProductList(resp?.data);
		} catch (error) {
			Toast.error(error.message);
		}
	};

	useEffect(() => {
		fetch();
	}, [period]);

	return {
		productList,
		loading,
		setPeriod,
		period,
	};
};
export default useTopProductList;
