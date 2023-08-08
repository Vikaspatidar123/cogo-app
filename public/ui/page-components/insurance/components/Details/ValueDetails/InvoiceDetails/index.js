import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function InvoiceDetails({
	control = {},
	errors = {},
	fields = [],
}) {
	return (
		<div className={styles.row}>
			{(fields || [])
				.filter((items, index) => index > 1 && index < 4)
				.map((item) => {
					const Element = getField(item.type);
					const renderingField = fields.find((ele) => ele.name === item.name);
					return (
						<div
							className={styles.col}
							key={item.name}
						>
							<div>{renderingField.placeholder}</div>
							<Element
								{...renderingField}
								key={item.name}
								control={control}
							/>
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
		</div>
	);
}

export default InvoiceDetails;
