import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import InviteTeamForm from './InviteTeamForm';
import Card from './InviteTeamForm/Card';
import styles from './styles.module.css';

import {
	useForm,
} from '@/packages/forms';

function InviteTeam({ org, setTimeForCall }) {
	const { t } = useTranslation(['common', 'getStarted']);
	const [teamMembers, setTeamMembers] = useState([]);
	const [showForm, setShowForm] = useState(true);
	const {
		handleSubmit, control, formState: { errors }, reset,
	} = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<span className={styles.header_container_bold}>
					{t('getStarted:rightPanel_get_started_invite_team_text_1')}
				</span>
				<div>{t('getStarted:rightPanel_get_started_invite_team_text_2')}</div>
			</div>
			<div className={styles.card_container}>
				<Card teamMembers={teamMembers} />
			</div>
			<div className={styles.main_container}>
				<InviteTeamForm
					handleSubmit={handleSubmit}
					control={control}
					errors={errors}
					teamMembers={teamMembers}
					setTeamMembers={setTeamMembers}
					setShowForm={setShowForm}
					showForm={showForm}
					reset={reset}
					org={org}
					setTimeForCall={setTimeForCall}
				/>
			</div>

		</div>
	);
}

export default InviteTeam;
