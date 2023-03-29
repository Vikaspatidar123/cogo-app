import { useState } from 'react';

import NoSearch from '../../common/NoSearch';
import useGetUserQuota from '../../hooks/useGetUserQuota';
import KycBenefits from '../KycBenefits';
import PastResults from '../PastResults';

import NewSearch from './NewSearch';

import { Head } from '@/packages/next';
import { useSelector } from '@/packages/store';

function SearchPage() {
	const [apiTries, setApiTries] = useState(0);
	const { quotaLoading, quotaData = [] } = useGetUserQuota({
		apiTries,
		setApiTries,
	});
	const { kyc_status, query } = useSelector(({ general, profile }) => ({
		kyc_status : profile?.organization?.kyc_status,
		query      : general?.query,
	}));
	const listStoreQuotaAPI = quotaData?.plan_details?.find(
		(item) => item.product_name === 'Spot Search',
	);
	const { left_quota = 0, addon_quota = 0 } = listStoreQuotaAPI || {};
	const blockSearch = !(
		left_quota + addon_quota > 0 || listStoreQuotaAPI?.is_unlimited
	);
	return (
		<div>
			<Head>
				<title>Discover Rates</title>
			</Head>
			<NewSearch
				loading={quotaLoading}
				blockSearch={blockSearch}
        // defaultSearchMode={defaultSearchMode}
				style={{ marginBottom: 16 }}
				listStoreQuotaAPI={listStoreQuotaAPI}
			/>
			{kyc_status === 'pending_from_user' || kyc_status === 'rejected' ? (
				<KycBenefits />
			) : null}

			{quotaLoading && blockSearch ? <NoSearch /> : <PastResults />}
		</div>
	);
}
export default SearchPage;
