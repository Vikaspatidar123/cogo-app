import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import { useSaasState } from '../../../common/context';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useHSCodelist = () => {
	const [hsList, setHsList] = useState([]);
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};
	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/product/category/list',
		method  : 'get',
		authKey : 'get_saas_product_category_list',
	}, { manual: true });

	const fetch = async () => {
		try {
			const resp = await trigger({
				params: {
					organizationId: organization?.id,
				},
			});
			setHsList(resp.data);
		} catch (error) {
			Toast.error(error?.message || 'Something Went Wrong');
		}
	};
	useEffect(() => {
		fetch();
	}, []);
	return {
		hsList,
		loading,
		fetch,
	};
};
export default useHSCodelist;
