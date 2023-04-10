import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useFieldArray } from 'react-hook-form';

import Child from './Child';
import styles from './styles.module.css';

function ChildFormat({
	name,
	control,
	register,
	controls,
	error,
	showElements,
	buttonText,
	heading,
	showButtons = true,
	showHeading = true,
	disabled = false,
	customValues = [],
	showAddButton = true,
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	let displayHeading = showHeading;
	if (!showButtons) {
		displayHeading = false;
	}

	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<div>
					{displayHeading ? (
						<div className={styles.heading}>
							{showButtons ? `${startCase(name)} ${index + 1}` : heading}
						</div>
					) : null}

					<Child
						{...rest}
						key={field.id}
						field={field}
						index={index}
						register={register}
						control={control}
						controls={controls}
						name={name}
						remove={remove}
						error={error?.[index]}
						showElements={showElements?.[index]}
						customLabels={customValues?.label?.[index]}
						disabled={disabled}
					/>
				</div>
			))}

			{showAddButton && showButtons && !disabled ? (
				<div className={styles.button_wrap}>
					<Button onClick={() => append(childEmptyValues)}>
						<div>+</div>
						{buttonText || 'ADD'}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default ChildFormat;
