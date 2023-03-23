// import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/components';
import React from 'react';

import controls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function OverWeightModal({
	setShowOWModal = () => {},
	setOverWeightDoc = () => {},
}) {
	const {
		fields = {},
		formState = {},
		handleSubmit = () => {},
	} = useForm();
	console.log(controls, 'controls');
	const { errors } = formState;

	const onSubmit = (doc) => {
		setShowOWModal(false);

		setOverWeightDoc(doc);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Upload details</div>

			{/* <Layout controls={controls} fields={fields} errors={errors} /> */}
			Form ok

			<div className={styles.button_container}>
				<Button className="primary sm" onClick={handleSubmit(onSubmit)}>
					UPLOAD
				</Button>
			</div>
		</div>
	);
}

export default OverWeightModal;
