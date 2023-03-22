import { Toast } from '@cogoport/components';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';

const useBillingAddress = () => {
	const { profile } = useSelector((state) => state);
	const [data, setData] = useState([]);

	const [{ loading }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/list_organization_billing_addresses',
		},
		{ manual: true },
	);

	const [{ addressLoading = loading }, organisationAddressApi = trigger] = useRequest(
		{
			method : 'get',
			url    : '/list_organization_addresses',
		},
		{ manual: true },
	);

	const addressApi = useCallback(async () => {
		const params = {
			organization_id : profile?.organization.id,
			page_limit      : 100,
			page            : 1,
		};
		try {
			const resp = await trigger({
				params,
			});

			if (resp?.data?.list) {
				setData(resp?.data.list);
			}
		} catch (err) {
			Toast.error(err?.error?.message);
		}
	}, [profile?.organization.id, trigger]);

	const organisationAddress = useCallback(async () => {
		const params = {
			organization_id : profile?.organization.id,
			page_limit      : 100,
			page            : 1,
		};
		try {
			const resp = await organisationAddressApi({
				params,
			});
			const address2 = resp?.data?.list;
			setData((prev) => [...prev, ...address2]);
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [organisationAddressApi, profile?.organization.id]);

	return {
		organisationAddress,
		addressApi,
		addressdata    : data,
		addressLoading : loading || addressLoading,
		setData,
	};
};
export default useBillingAddress;
