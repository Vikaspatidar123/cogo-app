import { Placeholder, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetCogopointsStats from '../../../../hooks/useGetCogopointsStats';
import useGetEarnables from '../../../../hooks/useGetEarnables';
import Cards from '../Cards';
import ListCards from '../ListCard';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Points() {
	const { push } = useRouter();
	const { stats = {}, loading = false } = useGetCogopointsStats();
	const { earnablesList = [], earnablesLoading = false } = useGetEarnables();

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.left_div}>
					<div className={styles.title}>Cogopoints Dashboard</div>
				</div>
				<Button
					size="md"
					themeType="accent"
					onClick={() => push('/saas/cogo-store')}
				>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/store_3.png"
						alt="store"
						width="18px"
						height="18px"
						style={{ marginRight: '6px' }}
					/>
					Go To Store
				</Button>
			</div>
			<Cards stats={stats} loading={loading} />
			{earnablesLoading && isEmpty(earnablesList) ? (
				<div className={styles.flex}>
					{new Array(4).fill(1).map(() => (
						<Placeholder width="1000px" height="100px" className="skeleton" />
					))}
				</div>
			) : (
				<div className={styles.card_list}>
					<ListCards earnablesList={earnablesList} />
				</div>
			)}
		</div>
	);
}

export default Points;
