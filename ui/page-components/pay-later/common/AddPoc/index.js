import { Button } from '@cogoport/components';

import { ADDPOC_CONTROLS } from '../../configurations/addPocControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function AddPOC({
	setAddNewPoc = () => { },
	renderingField = {},
	setPOCDetails = () => { },
	updatePOCDetails = () => { },
}) {
	const { control, handleSubmit } = useForm();

	const submit = async (values) => {
		await setPOCDetails((prev) => ({
			...prev,
			[renderingField?.name]: values,
		}));
		updatePOCDetails({ poc: renderingField?.name, pocDetails: { [renderingField?.name]: values } });
	};

	return (
		<div>
			<form type="submit">
				{ADDPOC_CONTROLS.map((item) => {
					const Element = getField(item.type);
					return (
						<div className={styles.field}>
							<Element control={control} {...item} />
						</div>
					);
				})}
			</form>
			<div className={styles.button_wrapper}>
				<Button
					themeType="secondary"
					onClick={() => setAddNewPoc((prev) => (prev.filter((x) => x !== renderingField.name)))}
					className={styles.cancel_button}
					type="button"
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					onClick={handleSubmit(submit)}
					type="button"
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default AddPOC;
