import { Button } from '@cogoport/components';

import styles from './styles.module.css';
import useEditBillingAddress from './useEditBillingAddress';
// import Layout from '@/temp/form/FormLayout';

function EditBillingAddress({
	organizationType = '',
	addressIdxToUpdate,
	getOrganizationBillingAddress = {},
	organizationBillingAddressesList = [],
	handleCloseModal = () => { },
}) {
	const {
		formState,
		controls,
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
		<div className={styles.layout_container}>
			<div className={styles.heading}>
				billingAddress
			</div>
			{/* <Layout
				showElements={showElements}
				controls={controls}
				fields={fields}
				errors={formState.errors}
			/> */}
			<div className={styles.button_container}>
				<Button
					onClick={handleCloseModal}
					className="secondary md"
					disabled={loading}
					style={{
						marginRight: 16,
					}}
				>
					buttons.cancel
				</Button>

				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate)}
					className="primary md"
				>
					buttons.update
				</Button>
			</div>
		</div>
	);
}

export default EditBillingAddress;
