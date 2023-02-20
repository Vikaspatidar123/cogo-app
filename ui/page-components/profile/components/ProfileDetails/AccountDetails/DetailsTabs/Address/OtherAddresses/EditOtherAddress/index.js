import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';
import useEditOtherAddress from './useEditOtherAddress';

import getField from '@/packages/forms/Controlled';
// import Layout from '@/temp/form/FormLayout';

function EditOtherAddress({
	organizationType = '',
	address_key = '',
	otherAddressObjToUpdate = {},
	organizationOtherAddressesList,
	getOrganizationOtherAddresses,
	handleCloseModal = () => { },
}) {
	const {
		loading,
		control,
		showElements,
		fields,
		formState,
		handleSubmit,
		onCreate,
	} = useEditOtherAddress({
		organizationType,
		address_key,
		getOrganizationOtherAddresses,
		organizationOtherAddressesList,
		otherAddressObjToUpdate,
		handleCloseModal,
	});

	return (
		<div>
			<Modal.Header title={address_key?.label} />
			<Modal.Body>
				<div className={styles.layout}>
					{fields.map((item) => {
						const Controller = getField(item.type);
						const show = showElements[item.name];
						return (
							show && (
								<div className={styles.field}>
									<div className={styles.lable}>{item.label}</div>
									<Controller {...item} control={control} />
								</div>
							)
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={handleCloseModal}
					className="secondary md"
					style={{
						marginRight: 16,
					}}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate)}
					className="primary md"
				>
					Update
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default EditOtherAddress;
