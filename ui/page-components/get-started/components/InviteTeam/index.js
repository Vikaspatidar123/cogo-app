import React, { useState } from 'react';

import InviteTeamForm from './InviteTeamForm';
import Card from './InviteTeamForm/Card';
import styles from './styles.module.css';

import {
	useForm,
} from '@/packages/forms';

function InviteTeam({ orgId, setTimeForCall }) {
	const [teamMembers, setTeamMembers] = useState([]);
	const [showForm, setShowForm] = useState(true);
	const {
		handleSubmit, control, formState: { errors }, reset,
	} = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<span className={styles.header_container_bold}>Invite Team Members</span>
				Invite team members to access your Cogoport Account
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
					orgId={orgId}
					setTimeForCall={setTimeForCall}
				/>
			</div>

		</div>
	);
}

export default InviteTeam;
