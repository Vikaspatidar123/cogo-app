/* eslint-disable no-nested-ternary */
import { IcMFtick, IcMError } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { Fragment } from 'react';

import styles from './styles.module.css';

function BottomContainer({
	type,
	heading,
	milestones,
	lastUpdated,
}) {
	const currentMilestone = milestones?.current_milestone;
	const nextMilestone = milestones?.next_milestone;
	const lastMilestone = milestones?.last_milestone;

	const ICONS = {
		error   : IcMError,
		success : IcMFtick,
	};

	const Icon = ICONS[type] ?? Fragment;
	return (
		<div className={styles.container}>
			<div className={styles.bottom_text}>
				<div className={type === 'success' ? styles.text1 : styles.text3}>
					<Icon fill={type === 'error' ? '#EE3425' : '#ABCD62'} width={17} height={17} />
					<div className={styles.text}>
						<strong>{heading}</strong>
					</div>
				</div>
				<div className={styles.text2}>
					{nextMilestone ? (
						<div>
							Next Milestone :
							{nextMilestone}
						</div>
					) : (currentMilestone ? (
						<div>
							Current Milestone :
							{currentMilestone}
						</div>
					) : (lastMilestone ? (
						<div>
							Last Milestone :
							{lastMilestone}
						</div>
					) : (null)))}
				</div>
			</div>
			<div className={styles.bottom_text}>
				Last updated at:

				{format(lastUpdated, 'yyyy-MM-dd')}
			</div>
		</div>

	);
}

export default BottomContainer;
