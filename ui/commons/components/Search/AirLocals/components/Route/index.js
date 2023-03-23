import React from 'react';

import getControls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

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
	console.log(controls, 'controls');
	const { fields = {}, formState = () => {} } = useForm(controls);
	const { errors = {} } = formState || {};

	return (
		<div className={styles.container}>
			{/* <Layout controls={controls} fields={fields} errors={errors} /> */}
			{route?.origin ? (
				<div className={styles.error_message_container}>Airport is required</div>
			) : null}
		</div>
	);
}

export default Route;
