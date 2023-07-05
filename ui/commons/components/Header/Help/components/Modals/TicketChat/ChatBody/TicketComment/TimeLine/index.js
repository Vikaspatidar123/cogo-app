import getTimeLineText from '../../../../../../utils/useGetTimeLineText';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function TimeLine({ createdAt, type, description, ticketType }) {
	const timelineTextMapping = getTimeLineText({
		ticketType,
	});

	const timelineText = timelineTextMapping?.[type] || '';

	if (!timelineText) {
		return null;
	}

	return (
		<div className={styles.container} key={description}>
			<div className={styles.timeline_text}>
				<div className={styles.timeline_container}>
					{formatDate({
						date       : createdAt,
						formatType : 'dateTime',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						separator  : ' ',
					})}
				</div>
				<div className={styles.timeline_container}>{timelineText}</div>
			</div>
			<div className={styles.break_the_chat} />
		</div>
	);
}

export default TimeLine;
