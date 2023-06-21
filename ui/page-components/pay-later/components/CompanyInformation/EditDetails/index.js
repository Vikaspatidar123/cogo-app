import { Modal, Button } from '@cogoport/components';

import { EDIT_COMPANY_CONTROLS } from '../../../configurations/editCompanyControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function EditDetails({ setShowEdit = () => { }, showEdit = {}, data = {}, setUpdatedValues = () => { } }) {
	const {
		address, city, constitution_of_business, gst_number, name, pan, pincode, state,
	} = data || {};

	const { show = '', type = '' } = showEdit || {};

	const saveValues = (values) => {
		setUpdatedValues({ type, values });
	};

	const { control, handleSubmit } = useForm({
		defaultValues: {
			name,
			pan,
			gst_number,
			company_address: address,
			city,
			state,
			constitution_of_business,
			pincode,
		},
	});

	return (
		<Modal show={show} onClose={() => setShowEdit({ show: false })} closable>
			<Modal.Body>
				<form className={styles.form}>
					{EDIT_COMPANY_CONTROLS.map((item) => {
						const Element = getField(item.type);
						return (
							<div className={styles.field} key={item.name}>
								<div className={styles.field_name}>{item.label}</div>
								<Element control={control} {...item} />
							</div>
						);
					})}
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit(saveValues)}>Save</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditDetails;
