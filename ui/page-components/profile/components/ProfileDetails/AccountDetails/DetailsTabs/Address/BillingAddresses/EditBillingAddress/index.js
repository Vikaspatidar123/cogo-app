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
	handleCloseModal = () => {},
	mobalType,
}) {
	const {
		control,
		fields,
		showElements,
		handleSubmit,
		onCreate,
		loading,
		formState,
	} = useEditBillingAddress({
		organizationType,
		addressIdxToUpdate,
		getOrganizationBillingAddress,
		organizationBillingAddressesList,
		handleCloseModal,
		mobalType,
	});
	const { errors = {} } = formState || {};

	return (
		<div>
			<Modal.Header title={`${mobalType ? 'Edit' : ' Add'} Billing Address`} />
			<Modal.Body>
				<div className={styles.layout}>
					{fields.map((item) => {
						const Element = getField(item.type);
						const show = showElements[item.name];
						return (
							show && (
								<div className={styles.field}>
									<div className={styles.lable}>{item.label}</div>
									<Element {...item} control={control} />
									{errors && (
										<div className={styles.errors}>
											{errors[item?.name]?.message}
										</div>
									)}
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

				<Button disabled={loading} onClick={handleSubmit(onCreate)}>
					{mobalType ? 'Update' : 'Add'}
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default EditBillingAddress;
