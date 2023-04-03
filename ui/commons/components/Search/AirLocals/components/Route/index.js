import React from 'react';

import getControls from './controls';
import styles from './styles.module.css';

import { useForm, AsyncSelectController } from '@/packages/forms';

function Route({
	location = {},
	setLocation = () => {},

	formError = {},
}) {
	const { route = {} } = formError || {};
	const controls = getControls({
		setLocation,
		location,
	});
	const { formState = () => {}, control } = useForm();
	const { errors = {} } = formState || {};

	return (
		<div className={styles.container}>
			{/* <FormElement
				control={control}
				controls={controls}
				// showButtons
				errors={errors}
			/> */}
			<div className={styles.lable}>AIRPORT</div>
			<AsyncSelectController
				control={control}
				{...controls[0]}
				errors={errors}
			/>

			{route?.origin ? (
				<div className={styles.error_message_container}>Airport is required</div>
			) : null}
		</div>
	);
}

export default Route;
