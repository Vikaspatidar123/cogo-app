import { Button } from '@cogoport/components';

import { ADDPOC_CONTROLS } from '../../../../configurations/addPocControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function AddPOC({
	setAddNewPoc = () => { },
	updateLoading = false,
	updatePOCDetails = () => { },
}) {
	const { control, handleSubmit, formState:{ errors } } = useForm();

	const submit = async (values) => {
		await updatePOCDetails({ pocDetails: { user: { ...values }, designation: { value: values.designation } } });
	};

	return (
		<div>
			<form type="submit">
				{ADDPOC_CONTROLS.map((item) => {
					const Element = getField(item.type);
					return (
						<div className={styles.field}>
							<Element control={control} {...item} />
							<div className={styles.error_text}>
								{errors?.[item?.name]?.message || errors?.[item?.name]?.type }
							</div>
						</div>
					);
				})}
			</form>
			<div className={styles.button_wrapper}>
				<Button
					themeType="secondary"
					onClick={() => setAddNewPoc(false)}
					className={styles.cancel_button}
					type="button"
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					onClick={handleSubmit(submit)}
					type="button"
					loading={updateLoading}
					disabled={updateLoading}
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default AddPOC;
