import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';
import useEditOtherAddress from './useEditOtherAddress';
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
		controls,
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
		<div className={styles.layout_container}>
			<div className={styles.heading}>
				{`${'ok'} ${address_key?.label || startCase(otherAddressObjToUpdate.address_type)
				} ${'edit'}`}
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
					style={{
						marginRight: 16,
					}}
					disabled={loading}
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

export default EditOtherAddress;
