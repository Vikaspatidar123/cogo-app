import { Button } from '@cogoport/components';

import { InnerUploadControls } from '../../../InnerUploadControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function InnerForm() {
	const {
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {},
	});

	return (
		<div className={styles.inner_form}>
			<div className={styles.form}>
				{InnerUploadControls.map((item) => {
					const { label, name, component } = item || {};
					const Element = getField(component);

					return (
						<div className={styles.form_group}>
							<span className={styles.label}>{label}</span>

							<div className={styles.input_group}>
								<Element
									{...item}
									key={name}
									control={control}
									id={`${name}_input`}
								/>

								<div className={styles.error_message}>
									{errors?.[name]?.message}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.bottom_container}>
				<Button themeType="secondary" style={{ margin: '0 8px 0 0' }}>
					Cancel
				</Button>

				<Button>Save</Button>
			</div>
		</div>
	);
}

export default InnerForm;
