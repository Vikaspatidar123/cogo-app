import styles from './styles.module.css';

import { InputController, SelectController } from '@/packages/forms';

function InvoiceDetails({
	control = {},
	errors = {},
	fields = [],
	watch,
}) {
	return (
		<>
			{(control || [])
				.filter((items, index) => index > 1 && index < 4)
				.map((item, index) => {
					const Element = item.type === 'text' ? InputController : SelectController;
					return (
						<div
							className={styles.col}
							key={item.name}
							// action={errors[item.name]?.message}
						>
							<Element
								{...fields[index]}
								key={item.name}
							/>
							<div>
								<span className={watch(fields[index]?.name) !== '' ? styles.display : styles.hidden}>
									{fields[index].placeholder}
								</span>
							</div>
							{errors[fields[index].name]?.type === 'required'
							|| errors[fields[index].name]?.type === 'pattern'
							|| errors[fields[index].name]?.type === 'minLength'
							|| errors[fields[index].name]?.type === 'maxValue' ? (
								<div className={styles.error_message}>
									{errors[fields[index].name]?.message}
								</div>
								) : null}
						</div>
					);
				})}
		</>
	);
}

export default InvoiceDetails;
