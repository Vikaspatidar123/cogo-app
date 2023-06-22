import { cl, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import Image from 'next/image';

import GET_MAPPING from '../../../../../constant/card';
import { formatDate, formatTime } from '../../../../../utils/formatDateTime';

import styles from './styles.module.css';

const shipIcon = 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipIcon.jpg';

const widthProp = {
	VESSEL : 35,
	TRUCK  : 55,
	RAIL   : 55,
};

const getIconUrl = ({ mapping, type, transportMode }) => {
	const obj = {
		air   : mapping.AIR,
		ocean : mapping[transportMode] || shipIcon,
	};
	return obj[type];
};
function Card({ combineList = [], trackingType = 'ocean' }) {
	const { location = '', station = '', transport_mode = 'VESSEL' } = combineList?.[0] || {};
	const combineListLength = combineList.length;
	const { MILESTONE_ICON } = GET_MAPPING[trackingType];
	const url = getIconUrl({ mapping: MILESTONE_ICON, type: trackingType, transportMode: transport_mode });

	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.heading_container}`}>
				<h3 className={styles.title}>{location || station}</h3>
				<Image
					src={url}
					width={widthProp?.[transport_mode] || 35}
					height={35}
					alt="logo"
				/>
			</div>
			<div className={styles.info}>
				{combineList.map((item, index) => {
					const { id = '', milestone, event_date = '', actual_date = '', vessel_name = '' } = item || {};
					const date = formatDate({ date: event_date || actual_date, dateFormat: 'dd MMM yyyy' });
					const time = formatTime({ date: event_date || actual_date, timeFormat: 'hh:mm aaa' });
					return (
						<div
							key={id}
							className={cl`${styles.flex_box} ${styles.row}
						${index !== combineListLength - 1 ? styles.not_last_row : ''}`}
						>
							<div className={styles.date}>{date}</div>
							<div className={styles.milestone}>
								<span>
									{milestone}
								</span>
								{vessel_name && (
									<Tooltip
										content={vessel_name}
										placement="right"
									>
										<IcMInfo className={styles.info_icon} />
									</Tooltip>
								)}
							</div>
							<div className={styles.time}>{time}</div>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default Card;
