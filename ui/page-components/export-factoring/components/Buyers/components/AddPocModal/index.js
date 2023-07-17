import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { getAddPocControls } from '@/ui/page-components/export-factoring/configurations/getAddPocControls';
import useSubmitPocDetails from '@/ui/page-components/export-factoring/hooks/useSubmitPocDetails';

function AddPocModal({ refetch, openAddPoc, setOpenAddPoc, buyers, getCreditRequestResponse }) {
	const addPocControls = getAddPocControls();

	const {
		control, handleSubmit, formState: { errors },
	} = useForm();

	const { onSubmit, loading } = useSubmitPocDetails({
		buyers,
		refetch,
		setOpenAddPoc,
		getCreditRequestResponse,
	});

	return (
		<Modal
			size="lg"
			show={openAddPoc}
			onClose={() => setOpenAddPoc((pv) => !pv)}
		>
			<Modal.Header
				title="Add Poc"
			/>
			<Modal.Body>
				<div className={styles.formDiv}>
					<form>
						{addPocControls.map((item) => {
							const Element = getField(item?.type);
							return (
								<div className={styles.field} key={item.name}>
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

export default AddPocModal;
