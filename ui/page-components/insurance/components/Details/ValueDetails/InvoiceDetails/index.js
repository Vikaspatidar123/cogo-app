import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function InvoiceDetails({
	control = {},
	errors = {},
	fields = [],
	watch,
}) {
	return (
		<>
			{(fields || [])
				.filter((items, index) => index > 1 && index < 4)
				.map((item) => {
					const Element = getField(item.type);
					const renderingField = fields.find((ele) => ele.name === item.name);
					return (
						<div
							className={styles.col}
							key={item.name}
							// action={errors[item.name]?.message}
						>
							<Element
								{...renderingField}
								key={item.name}
								control={control}
							/>
							<div>
								<span className={watch(renderingField?.name) !== '' ? styles.display : styles.hidden}>
									{renderingField.placeholder}
								</span>
							</div>
							{errors[renderingField.name]?.type === 'required'
							|| errors[renderingField.name]?.type === 'pattern'
							|| errors[renderingField.name]?.type === 'minLength'
							|| errors[renderingField.name]?.type === 'maxValue' ? (
								<div className={styles.error_message}>
									{errors[renderingField.name]?.message}
								</div>
								) : null}
						</div>
					);
				})}
		</>
	);
}

export default InvoiceDetails;
