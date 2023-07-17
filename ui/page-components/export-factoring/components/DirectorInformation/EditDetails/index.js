import { Modal, Button, Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { getDirectorControls } from '../../../configurations/editDirectorControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function EditDetails({
	setShowEdit = () => { }, showEdit = {}, data = {}, setUpdatedValues = () => { },
	constitutionMapping,
	updatedValues = {},
}) {
	const {
		directors = {},

	} = data || {};
	const {
		name,
		date_of_birth,
		registration_number,
		gender,
		address,
		pincode,
		city,
		state,
		din,
	} = directors.find((item) => item.registration_number === showEdit.registration_number);

	const { show = '', type = '' } = showEdit || {};

	const saveValues = (values) => {
		setUpdatedValues((prev) => ({ ...prev, [type]: [...prev.director, values] }));

		setShowEdit((prev) => ({ ...prev, show: !prev.show }));
		return true;
	};

	const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			registration_number,
			name,
			gender,
			din,
			date_of_birth: new Date(date_of_birth),
			address,
			city,
			state,
			pincode,
		},
	});

	return (
		<Modal show={show} onClose={() => setShowEdit({ show: false })} closable>
			<Modal.Body>
				<form className={styles.form}>
					{getDirectorControls(constitutionMapping).map((item) => {
						const Element = getField(item.type);
						return (
							<div className={styles.field} key={item.name}>
								<div className={styles.field_name}>
									{item.label}
								</div>
								<Element
									control={control}
									{...item}
									disabled={!!control._defaultValues[item?.name]}
								/>
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
					onClick={() => setShowEdit({ show: false })}
					type="button"
				>
					close
				</Button>
				<Button onClick={handleSubmit(saveValues)} type="button">Save</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditDetails;
