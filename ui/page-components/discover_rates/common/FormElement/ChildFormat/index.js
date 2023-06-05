import { Button, cl } from '@cogoport/components';
import React, { useImperativeHandle, forwardRef } from 'react';

import Child from './child';
import styles from './styles.module.css';

import { useFieldArray } from '@/packages/forms';

function ChildFormat(
	{
		name,
		control,
		register,
		controls,
		error,
		showElements,
		showButtons,
		disableButtons,
		buttonText,
		showDivider,
		heading,
		label,
		deletePosition,
		...rest
	},
	ref,
) {
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
	return (
		<div className={cl`form-fieldArray-${name} ${styles.container}`}>
			{label && (
				<div className={`${styles.search}${styles.label}`}>{label}</div>
			)}

			{(fields || []).map((field, index) => (
				<span key={field.id}>
					{heading ? (
						<div className={styles.heading}>{`${heading} ${index + 1}`}</div>
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
						showLastDivider={index < fields.length - 1 || !showButtons}
						showDivider={showDivider}
						deletePosition={deletePosition}
					/>

					{showDivider && index < fields.length - 1 ? (
						<div
							className={cl`${styles.line}form-fieldArray-line ${styles.margin} `}
						/>
					) : null}
				</span>
			))}

			{showButtons && (
				<>
					<div
						className={cl`${styles.child_format_add_btn} ${styles.button_div}`}
					>
						<Button
							style={{
								color        : '#3879da',
								padding      : '0 4px',
								opacity      : disableButtons ? 0.6 : 1,
								fontSize     : 10,
								background   : 'transparent',
								border       : 'none',
								fontWeight   : 'bold',
								marginBottom : '10px',
							}}
							onClick={handleAppendChild}
							disabled={disableButtons}
							size="sm"
						>
							{`+ ${buttonText || 'ADD'}`}
						</Button>

						<div className={cl`form-fieldArray-line ${styles.line}`} />
					</div>

					{showDivider ? (
						<div
							className={cl`${styles.childformat_divider}${styles.divider}`}
							style={{ marginBottom: '16px', marginTop: '16px' }}
						/>
					) : null}
				</>
			)}
		</div>
	);
}

export default forwardRef(ChildFormat);
