import { cl, Button } from '@cogoport/components';
import { IcMAlert, IcMFdetention, IcMFhighCubeContainer } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

const STATS_MAPPING = [
	{
		key   : 'on_track',
		title : 'On Track',
		icon  : <IcMFhighCubeContainer width={25} height={25} />,
	},
	{
		key   : 'delay',
		title : 'Delay',
		icon  : <IcMFdetention width={25} height={25} />,
	},
	{
		key   : 'action_required',
		title : 'Action Required',
		icon  : <IcMAlert width={20} height={20} fill="#F9AE64" />,
	},
];

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
					key={stats?.key}
					className={cl`${styles.card} ${styles?.[stats.key]}
					${selectedCard === stats.key ? styles.selected : ''}`}
					role="presentation"
					onClick={() => clickHandler(stats?.key)}
				>
					<div className={styles.icon_container}>
						{stats.icon}
					</div>
					<div className={styles.info_container}>
						<p className={styles.text}>{stats.title}</p>
						<div className={styles.footer}>
							<p className={styles.num}>{data?.[stats.key]}</p>
							<Button themeType="linkUi">View</Button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
export default StatsContainer;
