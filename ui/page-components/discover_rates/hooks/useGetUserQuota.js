import { useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetUserQuota = ({ apiTries, setApiTries }) => {
	const { organization_id } = useSelector(({ profile }) => ({
		organization_id: profile.organization.id,
	}));

	const [quotaData, setQuotaData] = useState([]);

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/saas_get_user_quota_usage',
			method : 'get',
		},
		{ manual: true },
	);
	const getQuotaUsage = async () => {
		const params = { organization_id };
		try {
			const res = await trigger({ params });
			if (!res?.data?.message) {
				setQuotaData(res?.data);
				setApiTries(10);
			}
		} catch (err) {
			console.log(err, 'err');
		}
	};

	const interval = null;

	useEffect(() => {
		// if (apiTries === 0) {
		getQuotaUsage();
		// ; }
		// if (apiTries < 6) {
		// 	// eslint-disable-next-line react-hooks/exhaustive-deps
		// 	interval = setInterval(async () => {
		// 		try {
		// 			await getQuotaUsage();
		// 			setApiTries((prevState) => prevState + 1);
		// 		} catch (err) {
		// 			Toast.error(err);
		// 		}
		// 	}, 2000);
		// }
		return () => {
			clearInterval(interval);
		};
	}, [apiTries]);

	return {
		quotaLoading: loading,
		quotaData,
	};
};

export default useGetUserQuota;
