import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { ADDSIGNATORY_CONTROLS } from '@/ui/page-components/export-factoring/configurations/addSignatoryControls';

function AddSignatory({
	setAddSignatory = () => { },
	updateOrganizationCreditApplication = () => { },
	loading = false,
}) {
	const { control, handleSubmit, formState: { errors } } = useForm();

	const submit = (values) => {
		updateOrganizationCreditApplication({ ...values });
	};

	return (
		<div>
			<form type="submit">
				{ADDSIGNATORY_CONTROLS.map((item) => {
					const Element = getField(item.type);
					return (
						<div className={styles.field}>
							<div className={styles.field_name}>{item.placeholder}</div>
							<Element control={control} {...item} />
							<div className={styles.error_text}>
								{errors?.[item.name]?.message
									|| errors?.[item.name]?.type}
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
					type="button"
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					type="button"
					onClick={handleSubmit(submit)}
					loading={loading}
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default AddSignatory;
