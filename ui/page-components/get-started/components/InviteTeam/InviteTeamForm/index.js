import { Button } from '@cogoport/components';
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
								placeholder="Contact Name"
								rules={{ required: 'Contact Name is required.' }}
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
								placeholder="Email"
								rules={{ required: 'Email is required.' }}
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
								placeholder="Mobile Number"
							/>
						</div>
						<div className={styles.input_container}>
							<MultiselectController
								control={control}
								name="role_in_company"
								placeholder="Role(s) in Company"
								options={roles}
							/>
						</div>
						<div className={styles.button_container}>
							<div
								className={styles.add_button_container}
								onClick={handleAddMore}
								role="presentation"
							>
								<Button type="submit">CANCEL</Button>
							</div>
							<div
								className={styles.add_button_container}
							>
								<Button type="submit">ADD</Button>
							</div>
						</div>
					</>
				) : <Button onClick={handleAddMore}>+ Add More</Button>}
				<div className={styles.button_container}>
					<Button className={styles.button} themeType="accent" onClick={handleSkip}>
						SKIP
					</Button>
					<Button className={styles.button} themeType="accent" onClick={handleClick}>
						NEXT
					</Button>
				</div>
			</form>
		</div>
	);
}

export default InviteTeamForm;
