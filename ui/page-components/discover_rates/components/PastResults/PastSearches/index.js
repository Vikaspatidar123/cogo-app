import { setPastSearchesState } from '@cogo/app-store';
import { cl } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

// import EmptyState from '../../../../common/Quotations/components/EmptyState';
import Loader from '../../../common/Loader';
import getRecommendedSearches from '../../../hooks/useGetRecommendedSearches';

import Item from './Item';
import styles from './styles.module.css';

import { useSelector, useDispatch } from '@/packages/store';

function PastSearches({ mobile, setPastSearchCount }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const { list, kyc_status, branch_id, user_id } = useSelector(
		({ search, profile, general }) => ({
			list       : search.past_searches || [],
			kyc_status : (profile.organization || {}).kyc_status,
			branch_id  : general?.query?.branch_id,
			user_id    : profile?.id,
		}),
	);

	const className = `${mobile ? 'mobile' : ''}`;

	useEffect(() => {
		if ((list || []).length > 0) {
			return;
		}

		setLoading(true);
		getRecommendedSearches().then((res) => {
			if (!res.hasError) {
				dispatch(
					setPastSearchesState({
						past_searches: res?.data?.list || [],
					}),
				);
				setPastSearchCount({
					count   : (res?.data?.list || []).length,
					loading : false,
				});
			} else {
				setPastSearchCount({ count: 0, loading: false });
			}
			setLoading(false);
		});
	}, []);

	const content = {
		kyc: {
			title   : 'Complete your KYC to start booking',
			content : 'We need some details about your company to take bookings.',
			type    : 'kyc',
		},
		default: {
			title: 'Discover Rates',
			content:
        'Enter your Origin, Destination, and Container/Cargo details to view rates',
			type: null,
		},
	};

	return (
		<div className={cl`${styles[className]}${styles.container}`}>
			{loading && <Loader mobile={mobile} />}
			{!loading && list.length === 0 ? (
				{/* <EmptyState
					{...content[kyc_status === 'pending_from_user' ? 'kyc' : 'default']}
				/> */}
			) : (
      	list.map((item) => (
	<Item
		key={item.created_at}
		data={{
            	...item,
            	importer_exporter_branch_id: branch_id,
            	user_id,
		}}
		mobile={mobile}
	/>
      	))
			)}
		</div>
	);
}

export default PastSearches;
