import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const backgroundStatus = ({ status }) => {
	if (['review_requested', 'rejected'].includes(status)) { return '#bf291e'; }
	if (['approved', 'verified', 'VERIFIED', 'COMPLETED'].includes(status)) { return ' #849e4c'; }
	return '#f9da7f';
};

function CommentBox({ comment = '' }) {
	return (
		<div className={styles.commentContainer}>
			<div className={styles.textHead}>Remarks : &nbsp;</div>
			<div className={styles.commentText}>{comment}</div>
		</div>
	);
}
const getFormattedStatus = (status = '') => ({
	active           : 'pending',
	review_requested : 'Rejected',
	approved         : 'verified',
}[status] || status);

function ShowStatus({ status = '' }) {
	return (
		<div className={styles.heading} style={{ backgroundColor: backgroundStatus({ status }) }}>
			{getFormattedStatus(status)?.replaceAll('_', ' ')?.toUpperCase()}
			{status === 'review_requested' && (
				<IcMInfo height="16px" width="16px" style={{ paddingLeft: '4px' }} />
			)}
		</div>
	);
}

function StatusBox({ status = '', rejection_reason = '' }) {
	if (status === 'review_requested') {
		return (
			<Tooltip
				content={<CommentBox comment={rejection_reason} />}
				placement="right"
				theme="light"
				interactive
			>
				<div>
					<ShowStatus status={status} />
				</div>
			</Tooltip>
		);
	}

	return <ShowStatus status={status} />;
}
export default StatusBox;
