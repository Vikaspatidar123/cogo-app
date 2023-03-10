/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useSellerAddress = () => {
	const { branch } = useSelector((state) => state.profile);

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'list_organization_billing_addresses',
	}, { manual: true });

	const getSellerAddress = async () => {
		try {
			await trigger({
				params: {
					page    : 1,
					filters : { organization_branch_id: branch?.id },

				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	};
	useEffect(() => {
		getSellerAddress();
	}, []);

	return {
		data, loading,
	};
};

export default useSellerAddress;
