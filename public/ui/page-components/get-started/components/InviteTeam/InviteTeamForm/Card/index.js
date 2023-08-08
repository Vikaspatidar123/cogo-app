import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function Card({ teamMembers }) {
	const { t } = useTranslation(['common', 'getStarted']);
	return (
		<div className={styles.main_container}>
			{teamMembers.map((val) => (
				<div className={styles.container}>
					{t('getStarted:rightPanel_get_started_team_members_name_label')}
					{' '}
					:
					{' '}
					{val?.contact_name}
					<div>
						{t('getStarted:rightPanel_get_started_team_members_email_label')}
						{' '}
						:
						{' '}
						{val?.email}
					</div>
				</div>
			))}
		</div>
	);
}

export default Card;
