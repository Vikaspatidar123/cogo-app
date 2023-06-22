import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';
import useEditOtherAddress from './useEditOtherAddress';

import getField from '@/packages/forms/Controlled';

function EditOtherAddress({
	organizationType = '',
	address_key = '',
	otherAddressObjToUpdate = {},
	organizationOtherAddressesList,
	getOrganizationOtherAddresses,
	handleCloseModal = () => {},
	getAdd,
	mobalType,
}) {
	const { loading, control, showElements, fields, handleSubmit, onCreate } = useEditOtherAddress({
		organizationType,
		address_key,
		getOrganizationOtherAddresses,
		organizationOtherAddressesList,
		otherAddressObjToUpdate,
		handleCloseModal,
		getAdd,
		mobalType,
	});
	return (
		<div>
			<Modal.Header
				title={mobalType ? `Edit ${address_key?.label}` : address_key?.label}
			/>
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
					style={{
						marginRight: 16,
					}}
					themeType="secondary"
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate)}
					themeType="primary"
				>
					{mobalType ? 'Update' : 'Add'}
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default EditOtherAddress;
