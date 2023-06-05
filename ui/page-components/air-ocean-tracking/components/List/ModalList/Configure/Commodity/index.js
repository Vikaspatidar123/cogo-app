import { Button } from '@cogoport/components';

import commodityControls from '../../../../../configuration/commodityControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Commodity() {
	const { control, handleSubmit, formState:{ errors } } = useForm();

	const onSubmit = (data) => {
		console.log(data, 'data');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Select Commodity</h3>
			</div>
			<div className={styles.form_container}>
				{commodityControls.map((config) => {
					const { name, label, type } = config;
					const Element = getField(type);
					return (
						<div key={name} className={styles.col}>
							<p>{label}</p>
							<Element control={control} {...config} />
							<p>{errors?.[name]?.message || errors?.[name]?.type}</p>
						</div>
					);
				})}
			</div>
			<div className={styles.footer}>
				<Button themeType="secondary">Cancel</Button>
				<Button className={styles.submit_btn} themeType="accent" onClick={handleSubmit(onSubmit)}>Save</Button>
			</div>
		</div>
	);
}

export default Commodity;
