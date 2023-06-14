import { cl } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../../common/EmptyState';
import Loader from '../../../common/Loader';

import Item from './Item';
import styles from './styles.module.css';

import {
	useSelector,
} from '@/packages/store';

function PastSearches({
	loading,
}) {
	const {
		list = [],
		kyc_status,
		branch_id,
		user_id,
	} = useSelector(({ search, profile, general }) => ({
		list       : search.past_searches || [],
		kyc_status : (profile.organization || {}).kyc_status,
		branch_id  : general?.query?.branch_id,
		user_id    : profile?.id,
	}));

	const content = {
		kyc: {
			title: 'Complete your KYC to start booking',
			content:
                'We need some details about your company to take bookings.',
			type: 'kyc',
		},
		default: {
			title: 'Discover Rates',
			content:
                'Enter your Origin, Destination, and Container/Cargo details to view rates',
			type: null,
		},
	};
	return (
		<div className={cl`${styles.container}`}>
			{loading && <Loader />}
			{!loading && list.length === 0 ? (
				<EmptyState
					{...content[
						kyc_status === 'pending_from_user' ? 'kyc' : 'default'
					]}
				/>
			) : (
				(list || [])?.map((item) => (
					<Item
						key={item.created_at}
						data={{
							...item,
							importer_exporter_branch_id: branch_id,
							user_id,
						}}
					/>
				))
			)}
		</div>
	);
}

export default PastSearches;
