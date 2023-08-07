import { Modal, Button, RadioGroup } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { getAddBankControls } from '@/ui/page-components/export-factoring/configurations/getAddBankControls';
import useSubmitBankDetails from '@/ui/page-components/export-factoring/hooks/useSubmitBankDetails';

const OPTIONS = [
	{
		label : 'Current Account',
		value : 'current_account',
	},
	{
		label : 'EEFC Account',
		value : 'eefc_account',
	},
];

function AddBankModal({
	refetch,
	addBankModal,
	setAddBankModal,
	getCreditRequestResponse,
}) {
	const [accountType, setAccountType] = useState('current_account');

	const addBankControls = getAddBankControls({ accountType });
	const {
		control, handleSubmit, formState: { errors },
	} = useForm();

	const { onSubmit, loading } = useSubmitBankDetails({
		accountType,
		refetch,
		setAddBankModal,
		// exporter_bank_account_id,
		getCreditRequestResponse,
	});

	return (
		<Modal
			show={addBankModal}
			onClose={() => setAddBankModal((pv) => !pv)}
			showCloseIcon
			size="lg"
			style={{ maxHeight: '700px' }}
		>
			<Modal.Header title="Add Bank Details" />
			<Modal.Body style={{ maxHeight: '700px' }}>
				<div className={styles.field_name} style={{ paddingLeft: '24px' }}>
					Select Bank Account Type
				</div>

				<RadioGroup
					options={OPTIONS}
					value={accountType}
					onChange={setAccountType}
				/>
				<div className={styles.formDiv}>
					{addBankControls.map((item) => {
						const Element = getField(item?.type);
						return (
							item?.type
												&& (
													<div className={styles.field} key={item.name}>
														<div className={styles.field_name}>{item?.label}</div>
														<Element control={control} {...item} />
														<div className={styles.error_text}>
															{errors?.[item?.name]?.message
																|| errors?.[item?.name]?.type}
														</div>
													</div>
												)
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
					type="button"
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default AddBankModal;
