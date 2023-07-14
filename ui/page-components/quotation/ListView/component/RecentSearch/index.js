import { IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { memo, useRef } from 'react';

import useRecentSearch from '../../hooks/useRecentSearch';

import Card from './Card';
import styles from './styles.module.css';

const SERVICES_ARR = ['fcl_freight', 'lcl_freight', 'air_freight'];

function RecentSearch() {
	const { loading, recentSearchData = [] } = useRecentSearch();
	const scrollRef = useRef();
	const scrollHandler = () => {
		scrollRef.current.scrollLeft += 820;
	};

	return (
		<div className={styles.container}>
			{!loading && !isEmpty(recentSearchData) && (
				<>
					<h2 className={styles.recent_search}>Recent Searches</h2>
					<div className={styles.row_container}>
						<div className={styles.scroll_content} ref={scrollRef}>
							<div className={styles.card_container}>
								{recentSearchData.map((recentData) => {
									const { search_type = '' } = recentData || {};
									if (SERVICES_ARR.includes(search_type)) {
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
				</>
			)}

		</div>
	);
}

export default memo(RecentSearch);
