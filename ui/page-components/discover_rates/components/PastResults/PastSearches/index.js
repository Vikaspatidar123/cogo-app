import { cl } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

// import EmptyState from '../../../../common/Quotations/components/EmptyState';
import Loader from '../../../common/Loader';
import getRecommendedSearches from '../../../hooks/useGetRecommendedSearches';

import Item from './Item';
import styles from './styles.module.css';

import {
	setPastSearchesState,
	useSelector,
	useDispatch,
} from '@/packages/store';

function PastSearches({ mobile = false, setPastSearchCount = () => {} }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const { list = [], kyc_status, branch_id, user_id } = useSelector(
		({ search, profile, general }) => ({
			list       : search.past_searches || [],
			kyc_status : (profile.organization || {}).kyc_status,
			branch_id  : general?.query?.branch_id,
			user_id    : profile?.id,
		}),
	);
	const className = `${mobile ? styles.mobile : ''}`;
	const SetDateInStore = async () => {
		const resp = await getRecommendedSearches();
		const { data = {} } = resp || {};

		if (!resp.hasError) {
			dispatch(
				setPastSearchesState({
					past_searches: data.list || [],
				}),
			);
			setPastSearchCount({
				count   : (data.list || []).length,
				loading : false,
			});
		} else {
			setPastSearchCount({ count: 0, loading: false });
		}
		setLoading(false);
	};
	useEffect(() => {
		if ((list || []).length > 0) {
			return;
		}
		setLoading(true);
		SetDateInStore();
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
		<div className={cl`${styles[className]} ${styles.container}`}>
			{/* {loading && <Loader mobile={mobile} />} */}

			{	(list || [])?.map((item) => (
				<Item
					key={item.created_at}
					data={{
						...item,
						importer_exporter_branch_id: branch_id,
						user_id,
					}}
					mobile={mobile}
				/>
	  ))}

		</div>
	);
}

export default PastSearches;
