import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useEditQuotation = ({ query, setValues, setValue, setActiveTab }) => {
	const { profile } = useSelector((state) => state);

	const { trigger, data } = useRequestBf('get', false, 'saas', {
		authkey: 'get_saas_quote',
	})('/saas/quote/');

	const [loading, setLoading] = useState(false);

	const editQuotation = async (id) => {
		try {
			setLoading(true);
			const resp = await trigger({ params: { quotationId: id, userId: profile.id } });
			if (resp?.data) {
				const { products, ...res } = resp?.data || {};
				const allProduct = products.map((x) => ({ ...x, actualPrice: x.grossAmount }));
				const setData = { products: allProduct, ...res };
				setValues(setData);
				setValue(
					'additionalCharges',
					resp?.data?.additionalChargesList?.additionalCharges,
				);
				// setValue('containerCount', resp?.data?.containerCount);
				setValue('incotermCharges', resp?.data?.additionalChargesList?.incotermCharges);
				setActiveTab(resp?.data?.transportMode);
				setLoading(false);
			}
		} catch (err) {
			setLoading(false);
			Toast.error(err?.message);
		}
	};
	useEffect(() => {
		if (query.id) {
			editQuotation(query.id);
		}
	}, [query.id]);
	return {
		editQuotation,
		editData    : data,
		editLoading : loading,
	};
};
export default useEditQuotation;
