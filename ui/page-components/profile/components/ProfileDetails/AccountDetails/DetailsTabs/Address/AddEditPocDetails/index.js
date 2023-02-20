import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';
import useEditPocDetails from './useEditPocDetails';

// import FormLayout from '@/temp/form/FormLayout';
import getField from '@/packages/forms/Controlled';

function AddEditPocDetails({
	getOrganizationBillingAddress = () => { },
	getOrganizationOtherAddresses = () => { },
	showPocModal,
	setShowPocModal = () => { },
	pocToUpdate = {},
	address_data = {},
	type = '',
}) {
	const {
		fields = {},
		handleSubmit = () => { },
		onCreate = () => { },
		loading = false,
		control = [],
	} = useEditPocDetails({
		getOrganizationBillingAddress,
		getOrganizationOtherAddresses,
		type,
		pocToUpdate,
		showPocModal,
		setShowPocModal,
		address_data,
	});

	return (
		<div>
			<Modal.Header title={showPocModal === 'edit'
				? 'Edit Poc'
				: 'Add POC'}
			/>

			<Modal.Body>

				<div>
					{fields.map((item) => {
						const ELEMENT = getField(item.type);
						return (

							<div className={styles.field}>
								<div className={styles.lable}>{item.label}</div>
								<ELEMENT {...item} control={control} />
							</div>

						);
					})}
				</div>
				<div className={styles.button_container} />

			</Modal.Body>

			<Modal.Footer>
				<Button
					disabled={loading}
					style={{ marginRight: 8 }}
					onClick={() => setShowPocModal(false)}
					size="sd"
					themeType="secondary"
				>
					Cancel
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onCreate)} size="sm" themeType="primary">
					{showPocModal === 'edit'
						? 'Edit'
						: 'Add'}
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default AddEditPocDetails;
