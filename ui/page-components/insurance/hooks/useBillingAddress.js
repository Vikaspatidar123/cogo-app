import { Toast } from '@cogoport/components';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';

const useBillingAddress = () => {
	const { profile } = useSelector((state) => state);

	const [{ loading, data, response }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_billing_addresses',
	}, { manual: true });

	// const [{ loading:addressLoading, data:responseFromOrgAddress }, organisationAddressApi = trigger] = useRequest({
	// 	method : 'get',
	// 	url    : '/list_organization_addresses',
	// }, { manual: true });

	const addressApi = useCallback(async () => {
		const params = {
			organization_id : profile?.organization.id,
			page_limit      : 100,
			page            : 1,
		};
		try {
			await trigger({
				params,
			});
		} catch (err) {
			Toast.error(err?.error?.message);
		}
	}, [profile?.organization.id, trigger]);

	// const organisationAddress = useCallback(async () => {
	// 	const params = {
	// 		organization_id : profile?.organization.id,
	// 		page_limit      : 100,
	// 		page            : 1,
	// 	};
	// 	try {
	// 		await organisationAddressApi({
	// 			params,
	// 		});
	// 	} catch (error) {
	// 		Toast.error(error?.message);
	// 	}
	// }, [organisationAddressApi, profile?.organization.id]);

	useEffect(() => {
		if (!data && !response) {
			addressApi();
			// organisationAddress();
		}
	}, [addressApi, data,
		//  organisationAddress,
		response]);

	return {
		addressdata:
			(loading
			// || addressLoading
			) ? []
				: (data?.list || []),
		// .concat(responseFromOrgAddress?.list || []),
		addressLoading: loading,
		// || addressLoading,
	};
};
export default useBillingAddress;
