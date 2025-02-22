import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const backgroundStatus = ({ status }) => {
	if (['active', 'approval_pending'].includes(status)) return '#f9da7f';
	if (['review_requested', 'rejected'].includes(status)) { return '#bf291e'; }
	if (['approved', 'verified', 'settled'].includes(status)) { return ' #849e4c'; }
	return '#f9da7f';
};

const statusFormat = ({ status = '' }) => ({ active: 'pending' }[status] ?? status);
function StatusTag({ status = '' }) {
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div className={styles.statusCircle} style={{ backgroundColor: backgroundStatus({ status }) }} />
			<div className={styles.heading}>
				{!isEmpty(status)
					? statusFormat({ status })?.replaceAll('_', ' ')?.toUpperCase()
					: 'PENDING'}
			</div>
		</div>
	);
}

export default StatusTag;
