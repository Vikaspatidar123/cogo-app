import { Button } from '@cogoport/components';

import customizeAlertControls from '../../../../../configuration/customizeAlertControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRouter } from '@/packages/next';

function CustomizeAlert({ closeHandler }) {
	const { query } = useRouter();
	const { branch_id = '' } = query || {};
	const { control, formState: { errors }, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	const controls = customizeAlertControls({ branch_id });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Select Contact</h3>
			</div>
			<div className={styles.form_container}>
				<div className={styles.row}>
					{controls.map((config) => {
						const { name, type } = config || {};
						const Element = getField(type);
						return (
							<div key={name} className={styles.col}>
								<Element control={control} {...config} />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}
				</div>

			</div>
			<div className={styles.footer}>
				<Button themeType="secondary" onClick={closeHandler}>Cancel</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					onClick={handleSubmit(onSubmit)}
				>
					Next
				</Button>
			</div>
		</div>
	);
}

export default CustomizeAlert;
