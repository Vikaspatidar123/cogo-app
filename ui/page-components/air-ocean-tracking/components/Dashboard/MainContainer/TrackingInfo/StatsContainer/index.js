import { cl, Button } from '@cogoport/components';
import { useState } from 'react';

import STATS_MAPPING from '../../../../../constant/statsMapping';

import styles from './styles.module.css';

const data = {
	on_track        : 40,
	delay           : 10,
	action_required : 10,
};

function StatsContainer() {
	const [selectedCard, setSelectedCard] = useState('on_track');

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
							<p className={styles.num}>{data?.[stats.value]}</p>
							<Button type="button" themeType="linkUi">View</Button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
export default StatsContainer;
