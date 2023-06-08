import { useState } from 'react';

import useGetUserQuota from '../../hooks/useGetUserQuota';
import useRecommendedSearches from '../../hooks/useRecommendedSearches';
import KycBenefits from '../KycBenefits';
import PastResults from '../PastResults';

import NewSearch from './NewSearch';

import { Head } from '@/packages/next';
import {
	useSelector,
} from '@/packages/store';

function SearchPage() {
	const [apiTries, setApiTries] = useState(0);
	const { quotaLoading = true, quotaData = [] } = useGetUserQuota({
		apiTries,
		setApiTries,
	});
	const { loading, setLoading } = useRecommendedSearches();

	const { kyc_status, query } = useSelector(
		({ search, general, profile }) => ({
			list       : search?.past_searches || [],
			kyc_status : profile?.organization?.kyc_status,
			query      : general?.query,
		}),
	);
	const listStoreQuotaAPI = quotaData?.plan_details?.find(
		(item) => item.product_name === 'Spot Search',
	);
	const { left_quota = 0, addon_quota = 0 } = listStoreQuotaAPI || {};
	const blockSearch = !(
		left_quota + addon_quota > 0 || listStoreQuotaAPI?.is_unlimited
	);
	const defaultSearchMode = query?.service_type;

	return (
		<div>
			<Head>
				<title>Discover Rates</title>
			</Head>
			<NewSearch
				loading={quotaLoading}
				blockSearch={blockSearch}
				defaultSearchMode={defaultSearchMode}
				style={{ marginBottom: 16 }}
				listStoreQuotaAPI={listStoreQuotaAPI}
			/>
			{kyc_status === 'pending_from_user' || kyc_status === 'rejected' ? (
				<KycBenefits />
			) : null}
			<PastResults
				loading={loading}
				quotaLoading={quotaLoading}
				setLoading={setLoading}
				blockSearch={blockSearch}
			/>
		</div>
	);
}
export default SearchPage;
