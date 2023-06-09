import { Button } from '@cogoport/components';

import { ADDPOCCONTROLS } from '../../../../configurations/addPocControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function AddPOC({ setAddNewPoc = () => {}, renderingField = {} }) {
	const { control } = useForm();

	return (
		<div>
			<div>
				{ADDPOCCONTROLS.map((item) => {
					const Element = getField(item.type);
					return (
						<div className={styles.field}>
							<Element control={control} {...item} />
						</div>
					);
				})}
			</div>
			<div className={styles.button_wrapper}>
				<Button
					themeType="secondary"
					onClick={() => setAddNewPoc((prev) => (prev.filter((x) => x !== renderingField.name)))}
					className={styles.cancel_button}
				>
					Cancel
				</Button>
				<Button themeType="accent">
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default AddPOC;
