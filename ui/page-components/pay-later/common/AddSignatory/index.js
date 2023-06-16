import { Button } from '@cogoport/components';

import { ADDSIGNATORYCONTROLS } from '../../configurations/addSignatoryControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function AddSignatory({
	setAddSignatory = () => {},
	updateOrganizationCreditApplication = () => { },
	loading = false,
}) {
	const { control, handleSubmit, formState:{ errors } } = useForm();

	const submit = (values) => {
		updateOrganizationCreditApplication({ values });
	};

	return (
		<div>
			<form type="submit">
				{ADDSIGNATORYCONTROLS.map((item) => {
					const Element = getField(item.type);
					return (
						<div className={styles.field}>
							<div className={styles.field_name}>{item.placeholder}</div>
							<Element control={control} {...item} />
							<div className={styles.error_text}>
								{errors?.[item.name]?.message
							|| errors?.[item.name]?.type }
							</div>
						</div>
					);
				})}
			</form>
			<div className={styles.button_wrapper}>
				<Button
					themeType="secondary"
					onClick={() => setAddSignatory(false)}
					className={styles.cancel_button}
				>
					Cancel
				</Button>
				<Button themeType="accent" onClick={handleSubmit(submit)} loading={loading}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default AddSignatory;
