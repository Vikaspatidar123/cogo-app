/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getUserAlert = ({ setFormData }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_user_alert_preference',
		method : 'get',
	}, { manual: true });
	const {
		profile,
	} = useSelector((state) => state);
	const getPreferences = async () => {
		try {
			await trigger(
				{ params: { user_id: profile.id } },
			);
		} catch (err) {
			Toast.error(err?.message);
		}
	};
	useEffect(() => { getPreferences(); }, []);
	useEffect(() => {
		const { preferences } = data || {};
		const {
			general_news,
			newsletter,
			offers_discounts,
			subscriber_special,
			new_product_service_launches_and_updates,
			product_service_explainers,
		} = preferences || {};

		const handleStatus = (val) => val === 'active';

		setFormData((prev) => ({
			...prev,
			offers_discounts                         : handleStatus(offers_discounts),
			subscriber_special                       : handleStatus(subscriber_special),
			new_product_service_launches_and_updates : handleStatus(
				new_product_service_launches_and_updates,
			),
			product_service_explainers : handleStatus(product_service_explainers),
			newsletter                 : handleStatus(newsletter),
			general_news               : handleStatus(general_news),
		}));
	}, [data]);
	return {
		getPreferences, data, loading, preferences: data?.preferences || {},
	};
};

export default getUserAlert;
