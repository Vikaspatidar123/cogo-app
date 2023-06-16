import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import useGetStartedAuthentication from '../../../hooks/useGetStartedAuthentication';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';
import CountrySelectController from '@/packages/forms/Controlled/CountrySelectController';

function DetailsForm({ setMode = () => { } }) {
	const { onGetStartedApi = () => {}, getStartedLoading } = useGetStartedAuthentication({ setMode });

	const { handleSubmit, formState: { errors }, control } = useForm({
		defaultValues: {
			business_name : '',
			country_id    : '',
		},
	});

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onGetStartedApi)}>

			<h2 className={styles.card_heading}>Get Started</h2>

			<div className={styles.field}>
				<div className={styles.label}>Company Name</div>
				<InputController
					control={control}
					name="business_name"
					type="text"
					placeholder="Enter your Company Name"
					rules={{ required: 'Company Name is required.' }}
					mode="onBlur"
				/>
				<span className={styles.errors}>
					{errors?.business_name?.message || ' '}
				</span>
			</div>

			<div className={styles.field}>
				<div className={styles.label}>Country of Registration</div>
				<CountrySelectController
					control={control}
					name="country_id"
					placeholder="Enter Country of Registration"
					rules={{ required: 'Country is required.' }}
				/>
				<span className={styles.errors}>
					{errors?.country_id?.message || ' '}
				</span>
			</div>

			<Button
				loading={getStartedLoading}
				type="submit"
				size="lg"
			>
				Get Started
				{' '}
				<IcMArrowRight />
			</Button>
		</form>
	);
}

export default DetailsForm;
