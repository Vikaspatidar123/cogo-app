import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';
import useEditPocDetails from './useEditPocDetails';

import getField from '@/packages/forms/Controlled';

function AddEditPocDetails({
	getOrganizationBillingAddress = () => {},
	getOrganizationOtherAddresses = () => {},
	showPocModal,
	setShowPocModal = () => {},
	pocToUpdate = {},
	address_data = {},
	type = '',
	refetch,
}) {
	const {
		fields = {},
		handleSubmit = () => {},
		onCreate = () => {},
		loading = false,
		control = [],
		register,
	} = useEditPocDetails({
		getOrganizationBillingAddress,
		getOrganizationOtherAddresses,
		type,
		pocToUpdate,
		showPocModal,
		setShowPocModal,
		address_data,
		refetch,
	});

	return (
		<div>
			<Modal.Header title={showPocModal === 'edit' ? 'Edit Poc' : 'Add POC'} />

			<Modal.Body>
				<div>
					{fields.map((item) => {
						const ELEMENT = getField(item.type);
						const isMobileNo = item.type === 'mobile_number';
						return (
							<div key={item.name} className={styles.field}>
								<div className={styles.lable}>{item.label}</div>
								<ELEMENT
									{...item}
									control={control}
									mobileSelectRef={isMobileNo ? register(item.name, item.rules).ref : undefined}
								/>
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

				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate)}
					size="sm"
					themeType="primary"
				>
					{showPocModal === 'edit' ? 'Edit' : 'Add'}
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default AddEditPocDetails;
