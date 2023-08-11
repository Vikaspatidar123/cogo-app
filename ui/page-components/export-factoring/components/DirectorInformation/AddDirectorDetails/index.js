import { Modal, Button } from '@cogoport/components';
import React from 'react';

import { getDirectorControls } from '../../../configurations/editDirectorControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function AddDirectorDetails({
	setShowAddDirectors,
	showAddDirectors,
	setUpdatedValues = () => {},
	setShowEdit = () => {},
	constitutionMapping = {},
}) {
	const { control, handleSubmit, formState: { errors } } = useForm({});
	const submit = (values) => {
		setUpdatedValues((prev) => ({ ...prev, director: [...prev.director, values] }));
		setShowEdit((prev) => ({ ...prev, show: !prev.show }));
	};

	return (
		<Modal show={showAddDirectors} onClose={() => setShowAddDirectors({ show: false })} closable>
			<Modal.Body>
				<form className={styles.form}>
					{getDirectorControls(constitutionMapping).map((item) => {
						const Element = getField(item.type);
						return (
							<div className={styles.field} key={item.name}>
								<div className={styles.field_name}>{item.label}</div>
								<Element control={control} {...item} />
								<div className={styles.error_text}>
									{errors?.[item?.name]?.message || errors?.[item?.name]?.type }
								</div>
							</div>
						);
					})}
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					style={{ marginRight: '10px' }}
					themeType="secondary"
					onClick={() => setShowAddDirectors(false)}
					type="button"
				>
					close
				</Button>
				<Button onClick={handleSubmit(submit)} type="button">Save</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddDirectorDetails;
