import React from 'react';

import styles from './styles.module.css';

import {
	useForm, SelectController,
} from '@/packages/forms';

function OrganizationForm() {
	const {
		handleSubmit, formState: { errors }, control, watch,
	} = useForm();
	return (
		<div>
			<form className={styles.form_container}>
				<div className={styles.select_container}>
					<SelectController
						control={control}
						name="name"
						placeholder="Name"
						rules={{ required: 'Name is required.' }}
					/>

					{errors.name && (
						<span>
							{errors.name.message}
						</span>
					)}
				</div>
			</form>
		</div>
	);
}

export default OrganizationForm;
