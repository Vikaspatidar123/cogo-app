/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getOrganizationBillingAddress = () => {
	const { profile } = useSelector((item) => item);
	const [{ loading, data }, trigger] = useRequest({
		url: '/list_organization_billing_addresses',
		method: 'get',
	}, { manual: true });

	const getAddress = async () => {
		try {
			await trigger({
				params: {
					filters: { organization_branch_id: profile.branch.id },

				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => { getAddress(); }, []);
	return { getAddress, loading, data };
};
export default getOrganizationBillingAddress;
