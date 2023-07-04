import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useCreateOrganizationUserInvitation from '../../../hooks/useCreateOrganizationUserInvitation';
import { roles } from '../roles';

import styles from './styles.module.css';

import { InputController, MobileNumberSelectController, MultiselectController } from '@/packages/forms';

function InviteTeamForm({
	handleSubmit,
	control,
	errors,
	teamMembers,
	setTeamMembers,
	setShowForm,
	showForm,
	reset,
	org,
	setTimeForCall,
}) {
	const { t } = useTranslation(['common', 'getStarted']);

	const handleAdd = (val) => {
		const temp = teamMembers;
		temp.push(val);
		setTeamMembers(temp);
		setShowForm(!showForm);
	};
	const {
		onClickCreateOrganizationUserInvitation,
	} = useCreateOrganizationUserInvitation({ org, setTimeForCall });

	const handleAddMore = () => {
		setShowForm(!showForm);
		reset();
	};

	const handleClick = () => {
		onClickCreateOrganizationUserInvitation(teamMembers);
	};

	const handleSkip = () => {
		setTimeForCall(true);
	};

	return (
		<div className={styles.main_container}>
			<form className={styles.form_container} onSubmit={handleSubmit(handleAdd)}>
				{showForm ? (
					<>
						<div className={styles.input_container}>
							<InputController
								control={control}
								name="contact_name"
								type="text"
								placeholder={t('getStarted:righPanel_get_started_invite_team_contact_name_label')}
								rules={{
									required:
									t('getStarted:righPanel_get_started_invite_team_contact_name_is_required'),
								}}
							/>

							{errors.contact_name && (
								<span className={styles.errors}>
									{errors.contact_name.message}
								</span>
							)}
						</div>
						<div className={styles.input_container}>
							<InputController
								control={control}
								name="email"
								type="text"
								placeholder={t('getStarted:rightPanel_get_started_team_members_email_label')}
								rules={{
									required:
								t('getStarted:righPanel_get_started_invite_team_email_is_required'),
								}}
							/>

							{errors.email && (
								<span className={styles.errors}>
									{errors.email.message}
								</span>
							)}
						</div>
						<div className={styles.input_container}>
							<MobileNumberSelectController
								control={control}
								name="mobile_number"
								type="mobile-number-select"
								placeholder={t('getStarted:righPanel_get_started_invite_mobile_number_label')}
							/>
						</div>
						<div className={styles.input_container}>
							<MultiselectController
								control={control}
								name="role_in_company"
								placeholder={t('getStarted:rightPanel_get_started_invite_roles_label')}
								options={roles}
							/>
						</div>
						<div className={styles.button_container}>
							<div
								className={styles.add_button_container}
								onClick={handleAddMore}
								role="presentation"
							>
								<Button type="submit">
									{t('getStarted:rightPanel_get_started_cancel_button_label')}
								</Button>
							</div>
							<div
								className={styles.add_button_container}
							>
								<Button type="submit">
									{t('getStarted:rightPanel_get_started_add_button_label')}
								</Button>
							</div>
						</div>
					</>
				) : (
					<Button onClick={handleAddMore}>
						+
						{' '}
						{t('getStarted:rightPanel_get_started_add_more_button_label')}
					</Button>
				)}
				<div className={styles.button_container}>
					<Button className={styles.button} themeType="accent" onClick={handleSkip}>
						{t('getStarted:rightPanel_get_started_skip_button_label')}
					</Button>
					<Button className={styles.button} themeType="accent" onClick={handleClick}>
						{t('getStarted:rightPanel_get_started_next_button_label')}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default InviteTeamForm;
