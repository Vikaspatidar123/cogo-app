import { Modal, Button } from '@cogoport/components';
import { useEffect, useState } from 'react';

import { getCompanyControls } from '../../../configurations/editCompanyControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function EditDetails({
	setShowEdit = () => { }, showEdit = {}, data = {}, setUpdatedValues = () => { },
	updatedValues,
	getCreditRequestResponse = {},
}) {
	const [addressDetail, setAddressDetail] = useState();
	const {
		address, city, constitution_of_business, gst_number, name, pan, pincode, state, gst_list,
		date_of_incorporation,
	} = data || {};
	const { org_iec_number = '' } = getCreditRequestResponse || {};

	const { show = '', type = '' } = showEdit || {};

	const saveValues = (values) => {
		setUpdatedValues((prev) => ({ ...prev, type, ...values }));
		setShowEdit(false);
	};

	const { control, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		defaultValues: {
			pan,
			name,
			org_iec_number,
			gst_number,
			company_address       : updatedValues.address || address,
			date_of_incorporation : date_of_incorporation ? new Date(date_of_incorporation) : '',
			city,
			state,
			constitution_of_business,
			zipcode               : pincode,
		},
	});

	useEffect(() => {
		setValue('company_address', updatedValues.address);
		setValue('city', addressDetail?.name);
		setValue('country', addressDetail?.country?.country_id);
		setValue('state', addressDetail?.region?.name);
		if (updatedValues.address) {
			clearErrors('company_address');
		}
	}, [updatedValues, setValue, addressDetail, clearErrors]);

	return (
		<Modal size="lg" show={show} onClose={() => setShowEdit({ show: false })} closable>
			<Modal.Body>
				<form className={styles.form}>
					{getCompanyControls({
						gst_list,
						setUpdatedValues,
						setAddressDetail,
					}).map((item) => {
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
					type="button"
					style={{ marginRight: '10px' }}
					themeType="secondary"
					onClick={() => setShowEdit({ show: false })}
				>
					close

				</Button>
				<Button type="button" onClick={handleSubmit(saveValues)}>Save</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditDetails;
