import { cl, Button } from '@cogoport/components';
import { useImperativeHandle, forwardRef } from 'react';

import Child from './child';
import styles from './styles.module.css';

import { useFieldArray } from '@/packages/forms';

function ChildFormat(props, ref) {
	const {
		name,
		control,
		register,
		controls,
		error,
		key,
		showElements,
		showButtons,
		disableButtons,
		buttonText,
		showDivider,
		heading,
		label,
		deletePosition,
		...rest
	} = props;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	const handleAppendChild = () => {
		append(childEmptyValues);
	};

	useImperativeHandle(ref, () => ({ handleAppendChild, remove }));
	const formName = `form-fieldArray-${name}`;
	return (
		<div className={cl`${styles.container} ${styles[formName]}`} key={key}>
			{label && <div className={cl`${styles.label} ${styles.search}`}>{label}</div>}

			{(fields || []).map((field, index) => (
				<span key={field.id}>
					{heading ? <div className={styles.heading}>{`${heading} ${index + 1}`}</div> : null}

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
						showLastDivider={index < fields.length - 1 || !showButtons}
						showDivider={showDivider}
						deletePosition={deletePosition}
					/>

					{showDivider && index < fields.length - 1 ? (
						<div className={cl`${styles.line} ${styles.margin} ${styles.form_fieldArray_line}`} />
					) : null}
				</span>
			))}

			{showButtons && (
				<>
					<div className={cl`${styles.button_div} ${styles.child_format_add_btn}`}>
						<Button
							className={cl`${styles.add_button} ${disableButtons ? styles.disable_btn : ''}`}
							onClick={handleAppendChild}
							disabled={disableButtons}
							size="sm"
						>
							{`+ ${buttonText || 'ADD'}`}
						</Button>

						<div className={cl`${styles.line} ${styles.form_fieldArray_line}`} />
					</div>

					{showDivider ? <div className={`${styles.divider} ${styles.childformat_divider}`} /> : null}
				</>
			)}
		</div>
	);
}

export default forwardRef(ChildFormat);
