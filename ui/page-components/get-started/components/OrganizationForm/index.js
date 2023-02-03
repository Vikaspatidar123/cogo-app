import React from 'react';

import {
	useForm, SelectController,
} from '@/packages/forms';

function OrganizationForm() {
	const {
		handleSubmit, formState: { errors }, control, watch,
	} = useForm();
	return (
		<div>
			<form>
				<div>
					<SelectController
						control={control}
						name="name"
						optionsListKey="countries"
						valueKey="id"
						labelKey="name"
						isClearable
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
