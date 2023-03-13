import { IcMArrowRight } from '@cogoport/icons-react';
import { memo, useRef } from 'react';

import iconUrl from '../../../utils/iconUrl.json';
import useRecentSearch from '../../hooks/useRecentSearch';

import Card from './Card';
import styles from './styles.module.css';

function RecentSearch() {
	const { loading, recentSearchData = [] } = useRecentSearch();
	const scrollRef = useRef();
	const recentDataLength = recentSearchData.length;
	const scrollHandler = () => {
		scrollRef.current.scrollLeft += 820;
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.recent_search}>Recent Searches</h2>
			{loading && (
				<div className={styles.loading_container}>
					<img src={iconUrl.loading} alt="loading..." />
				</div>
			)}
			{!loading && recentDataLength > 0 && (
				<div className={styles.row_container}>
					<div className={styles.scroll_content} ref={scrollRef}>
						<div className={styles.card_container}>
							{recentSearchData.map((recentData) => {
								const { search_type = '' } = recentData || {};
								if (
									search_type === 'fcl_freight'
								|| search_type === 'lcl_freight'
								|| search_type === 'air_freight'
								) {
									return (
										<Card data={recentData} />
									);
								}
								return null;
							})}
						</div>
					</div>
					<div className={styles.icon_container} role="presentation" onClick={scrollHandler}>
						<IcMArrowRight className={styles.animated_arrow} width={35} height={35} />
						<IcMArrowRight width={35} height={35} />
					</div>
				</div>
			)}
			{!loading && recentDataLength === 0 && (
				<div />
			)}
		</div>
	);
}

export default memo(RecentSearch);
