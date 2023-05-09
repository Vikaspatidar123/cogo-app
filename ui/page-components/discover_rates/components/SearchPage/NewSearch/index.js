import { cl } from '@cogoport/components';
import React, { useState, useCallback, forwardRef } from 'react';

import SearchForm from '../../../common/SearchForm';
import Tags from '../../../common/Tags';
import getConfiguration from '../../../hooks/configurations';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import Air from '@/ui/commons/components/Search/Air';

function NewSearch(
	{
		extraParams = {},
		onPush = () => {},
		style = {},
		className = 'app',
		blockSearch = false,
		defaultSearchMode = '',
		loading = false,
		search_type = '',
		showHeader = true,
		listStoreQuotaAPI = {},
	},
	ref,
) {
	const isChannelPartner = false;
	const modes = getConfiguration('modes', undefined, isChannelPartner);
	const [mode, setMode] = useState(defaultSearchMode || modes[0].value);
	const setModeMemo = useCallback((modeVal) => {
		setMode(modeVal);
	}, []);
	const { push } = useRouter();
	const renderSearchForm = () => {
		if (mode === 'air_freight') {
			return <Air extraParams={extraParams} showHeader={showHeader} />;
		}

		return (
			<>
				<SearchForm
					mode={mode}
					onPush={onPush}
					extraParams={extraParams}
					className={className}
					ref={ref}
					search_type={search_type}
				/>

				{blockSearch && (
					<div className={styles.flex} />
				)}

				{loading && (
					<div className={styles.flex}>
						<img
							style={{ height: 30 }}
							alt="cogo-logo"
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogo-animation.gif"
						/>
					</div>
				)}
			</>
		);
	};
	return (
		<div style={style} className={cl`${styles.container} ${styles.app}`}>
			<div className={styles.header}>
				<div className={styles.tags}>
					<div className={styles.heading}>Search Rates</div>
					<Tags
						list={modes}
						selected={mode}
						onClick={setModeMemo}
						className={className}
						showDomestic
						showContainerTransportation
					/>
				</div>
				{!listStoreQuotaAPI?.is_unlimited && (
					<div className={styles.tag_count}>
						<div className={styles.flex_div}>
							<div
								className={cl`${blockSearch && styles.tracker_remaining_text} ${styles.zero_trackers} `}
							>
								Searches Remaining:
								{Number(listStoreQuotaAPI?.left_quota)
									+ Number(listStoreQuotaAPI?.addon_quota) || 0}
							</div>

							<div
								role="presentation"
								className={styles.upgrade_plan}
								onClick={() => push(
									'/saas/cogo-subscriptions/manage-subscription',
									'/saas/cogo-subscriptions/manage-subscription',
								)}
							>
								Upgrade
							</div>
						</div>
					</div>
				)}
			</div>
			{renderSearchForm()}
		</div>
	);
}
export default forwardRef(NewSearch);
