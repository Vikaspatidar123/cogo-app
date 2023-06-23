import { cl, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import Image from 'next/image';

import GET_MAPPING from '../../../../../constant/card';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const widthProp = {
	VESSEL : 35,
	TRUCK  : 55,
	RAIL   : 55,
};

const getIconUrl = ({ mapping, type, transportMode }) => {
	const obj = {
		air   : mapping.AIR,
		ocean : mapping[transportMode] || GLOBAL_CONSTANTS.image_url.ship_icon,
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
					const date = formatDate({
						date       : event_date || actual_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatDate : 'date',
					});
					const time = formatDate({
						date       : event_date || actual_date,
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatDate : 'time',
					});
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
