import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';
import useEditBillingAddress from './useEditBillingAddress';

// import Layout from '@/temp/form/FormLayout';
import getField from '@/packages/forms/Controlled';

function EditBillingAddress({
	organizationType = '',
	addressIdxToUpdate,
	getOrganizationBillingAddress = {},
	organizationBillingAddressesList = [],
	handleCloseModal = () => { },
}) {
	const {
		formState,
		control,
		fields,
		showElements,
		handleSubmit,
		onCreate,
		loading,
	} = useEditBillingAddress({
		organizationType,
		addressIdxToUpdate,
		getOrganizationBillingAddress,
		organizationBillingAddressesList,
		handleCloseModal,
	});

	return (
		<div>
			<Modal.Header title="Edit Billing Address" />
			<Modal.Body>
				<div className={styles.layout}>
					{fields.map((item) => {
						const ELEMENT = getField(item.type);
						const show = showElements[item.name];
						return (
							show && (
								<div className={styles.field}>
									<div className={styles.lable}>{item.label}</div>
									<ELEMENT {...item} control={control} />
								</div>
							)
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={handleCloseModal}
					disabled={loading}
					themeType="secondary"
					style={{
						marginRight: 16,
					}}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate)}
				>
					Update
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default EditBillingAddress;
