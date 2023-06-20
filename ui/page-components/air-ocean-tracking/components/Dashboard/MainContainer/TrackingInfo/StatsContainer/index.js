import { cl, Button } from '@cogoport/components';
import { useState } from 'react';

import STATS_MAPPING from '../../../../../constant/statsMapping';
import useRedirectFn from '../../../../../hooks/useRedirectFn';

import styles from './styles.module.css';

function StatsContainer({ stats: statsData = {}, activeTab }) {
	const [selectedCard, setSelectedCard] = useState('on_track_shipments');

	const { redirectToListWithFilters } = useRedirectFn();

	const clickHandler = (key) => {
		setSelectedCard(key);
	};

	return (
		<div className={styles.container}>
			{STATS_MAPPING.map((stats) => (
				<div
					key={stats?.value}
					className={cl`${styles.card} ${styles?.[stats.value]}
					${selectedCard === stats.value ? styles.selected : ''}`}
					role="presentation"
					onClick={() => clickHandler(stats.value)}
				>
					<div className={styles.icon_container}>
						{stats.icon}
					</div>

					<div className={styles.info_container}>
						<p className={styles.text}>{stats.label}</p>

						<div className={styles.footer}>
							<p className={styles.num}>{statsData?.[stats.value] || 0}</p>
							<Button
								type="button"
								themeType="linkUi"
								onClick={() => redirectToListWithFilters({ type: activeTab, filters: stats.value })}
							>
								View
							</Button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
export default StatsContainer;
