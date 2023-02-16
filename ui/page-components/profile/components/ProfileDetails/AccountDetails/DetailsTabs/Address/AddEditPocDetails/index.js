import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useEditPocDetails from './useEditPocDetails';
// import FormLayout from '@/temp/form/FormLayout';

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
		formState = {},
		handleSubmit = () => { },
		onCreate = () => { },
		loading = false,
		controls = [],
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
		<div className={styles.container}>
			<div className={styles.heading}>
				{showPocModal === 'edit'
					? 'editPoc'
					: 'heading'}
			</div>

			{/* <FormLayout
				controls={controls}
				errors={formState.errors}
				fields={fields}
			/> */}

			<div className={styles.button_container}>
				<Button
					disabled={loading}
					className="secondary sm"
					style={{ marginRight: 8 }}
					onClick={() => setShowPocModal(false)}
				>
					buttons
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onCreate)}>
					{showPocModal === 'edit'
						? 'edit'
						: 'address'}
				</Button>
			</div>
		</div>
	);
}

export default AddEditPocDetails;
