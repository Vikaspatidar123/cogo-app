import { Pill } from '@cogoport/components';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function Details({ rfqItem }) {
	const {
		serial_id = '',
		created_at = '',
		status = '',
		is_explored,
		name = '',
	} = rfqItem || {};

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.id}>
					RFQ ID :
					{' '}
					{serial_id || ''}
				</div>

				{name && (
					<div className={styles.name}>
						RFQ Name:
						{' '}
						<div className={styles.name_id}>
							{' '}
							{name}
						</div>
					</div>
				)}

				<Pill>{['uploaded'].includes(status) ? 'Requested' : status}</Pill>

				{!is_explored && status === 'live' && (
					<div className={styles.explore_tag}>New RFQ Reverted</div>
				)}
			</div>

			<div className={styles.right_container}>
				{created_at && (
					<div className={styles.date}>
						Created On:
						{' '}
						{formatDate({
							date       : created_at || '-',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
						{' '}
					</div>
				)}
			</div>
		</div>
	);
}

export default Details;
