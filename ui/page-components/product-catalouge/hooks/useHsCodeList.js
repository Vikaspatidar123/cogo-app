/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useHSCodelist = () => {
	const { t } = useTranslation(['common', 'productCatalogue']);
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
			console.log(error?.message || t('productCatalogue:product_catalogue_toast_2'));
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
