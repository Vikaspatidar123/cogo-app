import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetBillingAddress = () => {
	const { profile } = useSelector((item) => item);
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_organization_billing_addresses',
			method : 'get',
		},
		{ manual: true },
	);
	const [{ loading: addressLoading, data: addressesData }, triggerAddress] = useRequest({
		url    : '/list_organization_addresses',
		method : 'get',
	}, { manual: true });

	const getAddress = async () => {
		try {
			await trigger({
				params: {
					filters: { organization_branch_id: profile.branch.id },
				},
			});
		} catch (err) {
			console.error(err);
		}
	};
	const getAdd = async () => {
		try {
			await triggerAddress({
				params: {
					filters: { organization_branch_id: profile.branch.id },
				},
			});
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		getAddress();
		getAdd();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		getAddress,
		getAdd,
		loading,
		addressesData,
		data,
		addressLoading,
	};
};
export default useGetBillingAddress;
