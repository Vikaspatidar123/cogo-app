import { Modal, Button } from '@cogoport/components';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import { getAddBuyerControls } from '@/ui/page-components/export-factoring/configurations/getAddBuyerControls';
import useSubmitBuyerDetails from '@/ui/page-components/export-factoring/hooks/useSubmitBuyerDetails';

function AddBuyerModal({ openAddBuyer, setOpenAddBuyer }) {
	const addBuyerControls = getAddBuyerControls();

	const {
		control, watch, handleSubmit, formState: { errors },
	} = useForm();

	const { onSubmit, loading } = useSubmitBuyerDetails();

	return (
		<Modal
			size="lg"
			show={openAddBuyer}
			onClose={() => setOpenAddBuyer((pv) => !pv)}
		>
			<Modal.Header
				title="Add Buyer"
			/>
			<Modal.Body>
				<div className={styles.formDiv}>
					<form>
						{addBuyerControls.map((item) => {
							// if (item?.type === 'fieldArray') {
							// 	return (
									
							// 	);
							// }
							const Element = getField(item?.type);
							return (
								<div className={styles.field}>
									<div className={styles.field_name}>{item?.label}</div>
									<Element control={control} {...item} />
									<div className={styles.error_text}>
										{errors?.[item?.name]?.message
												|| errors?.[item?.name]?.type }
									</div>
								</div>

							);
						})}
					</form>
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

export default AddBuyerModal;
