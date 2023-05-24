import { Button } from '@cogoport/components';
import React from 'react';

import controls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

function OverWeightModal({
	setShowOWModal = () => {},
	setOverWeightDoc = () => {},
}) {
	const {
		formState = {},
		handleSubmit = () => {},
		control,
	} = useForm();

	const { errors } = formState;

	const onSubmit = (doc) => {
		setOverWeightDoc(doc);
		setShowOWModal(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Upload details</div>

			<FormElement control={control} controls={controls} errors={errors} noScroll />

			<div className={styles.button_container}>
				<Button className="primary sm" onClick={handleSubmit(onSubmit)}>
					UPLOAD
				</Button>
			</div>
		</div>
	);
}

export default OverWeightModal;
