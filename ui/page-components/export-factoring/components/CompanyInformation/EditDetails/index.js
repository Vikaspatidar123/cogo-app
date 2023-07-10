import { Modal, Button } from '@cogoport/components';
import { useEffect } from 'react';

import { getCompanyControls } from '../../../configurations/editCompanyControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function EditDetails({
	setShowEdit = () => { }, showEdit = {}, data = {}, setUpdatedValues = () => { },
	updatedValues,
	getCreditRequestResponse = {},
}) {
	const {
		address, city, constitution_of_business, gst_number, name, pan, pincode, state, gst_list,
		date_of_incorporation,
	} = data || {};
	const { org_iec_number = '' } = getCreditRequestResponse || {};

	const { show = '', type = '' } = showEdit || {};

	const saveValues = (values) => {
		console.log(values, 'aaqq');
		setUpdatedValues((prev) => ({ ...prev, type, ...values }));
		setShowEdit(false);
	};

	const { control, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		defaultValues: {
			pan,
			name,
			org_iec_number,
			gst_number,
			company_address: updatedValues.address || address,
			date_of_incorporation,
			city,
			state,
			constitution_of_business,
			pincode,
		},
	});

	useEffect(() => {
		setValue('company_address', updatedValues.address);
		if (updatedValues.address) {
			clearErrors('company_address');
		}
	}, [updatedValues, setValue]);

	return (
		<Modal size="lg" show={show} onClose={() => setShowEdit({ show: false })} closable>
			<Modal.Body>
				<form className={styles.form}>
					{getCompanyControls(gst_list, setUpdatedValues).map((item) => {
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
					onClick={() => setShowEdit({ show: false })}
				>
					close

				</Button>
				<Button onClick={handleSubmit(saveValues)}>Save</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditDetails;
