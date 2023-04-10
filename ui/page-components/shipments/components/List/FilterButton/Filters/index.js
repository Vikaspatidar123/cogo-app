import Form from './FormElement';
import Header from './Header';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function Filters({
	onClose,
	setFilters,
	filters,
	controls: propControls,
	dynamicKey,
	isScrollable,
	id_prefix = 'page',
}) {
	const controls = propControls
		.filter((control) => {
			if (
				Array.isArray(control.showForScope)
				&& !control.showForScope.includes()
			) {
				return false;
			}
			return true;
		})
		.map((control) => ({ ...control, value: filters[control.name] }));

	const { control, getValues, setValue, watch } = useForm();

	const fieldsProp = {};

	controls.forEach((item) => {
		fieldsProp[item.name] = { ...item, control };
	});

	const fields = {};
	Object.keys(fieldsProp).forEach((key) => {
		if (dynamicKey && key === dynamicKey) {
			fields[key] = {
				...fieldsProp[key],
				onChange: (val) => {
					setFilters({ ...filters, [key]: val });
				},
			};
		} else {
			fields[key] = fieldsProp[key];
		}
	});

	const onSubmit = async () => {
		const values = await getValues();

		if (values === null) {
			return;
		}

		const newValues = {};
		controls.forEach((item) => {
			if (
				values[item.name]
				|| values[item.name] === false
				|| values[item.name] === 0
			) {
				newValues[item.name] = values[item.name];
			}
		});

		setFilters(newValues);
		onClose();
	};

	const handleReset = () => {
		setFilters({});
		onClose();
		// setValue({});
	};

	return (
		<div className={styles.container}>
			<Header
				onClose={onClose}
				onSubmit={onSubmit}
				onReset={handleReset}
				id_prefix={`${id_prefix}_filters`}
			/>
			<div className={`${styles.main} ${isScrollable ? styles.scroll : ''}`}>
				<Form
					controls={controls}
					fields={fields}
					id_prefix={`${id_prefix}_filters`}
					watch={watch}
				/>
			</div>
		</div>
	);
}

export default Filters;
