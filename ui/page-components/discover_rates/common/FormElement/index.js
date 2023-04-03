import React from 'react';

import CBMCalculator from './CBMCalculator';
import ChildFormat from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

function FormElement({
	controls,
	errors = {},
	showElements = {},
	formValues = {},
	control,
	showButtons = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{controls.map((item) => {
        	const show = !(item.name in showElements) || showElements[item.name];
        	if (item.type === 'cbm_calculator') {
        		return (
	<CBMCalculator
		key={item.name}
		formValues={formValues}
                // onChange={fields[item?.name].onChange}
		item={item}
	/>
        		);
        	}
        	if (item.type === 'fieldArray') {
        		return show ? (
	<div className={styles.col} key={item.name}>
		<ChildFormat
			{...item}
			{...controls.find((s) => s.name === item.name)}
			key={item.name}
			buttonText={item.buttonText}
			showButtons={item.showButtons || showButtons}
			heading={item.heading}
			showDeleteButton={item.showDeleteButton}
			showDivider={item.showDivider}
			noDeleteButtonTill={
                    controls.find((s) => s.name === [item.name])
                    	?.noDeleteButtonTill
                  }
			label={item.label}
			formValues={formValues[item.name]}
			error={errors[item.name]}
			showElements={showElements[item.name]}
			control={control}
		/>
	</div>
        		) : null;
        	}
        	{
        		return show ? (
	<div className={styles.col}>
		<Item
			key={item.name}
			name={item.name}
			{...controls.find((s) => s.name === item.name)}
			formValue={formValues[item.name]}
			error={errors[item.name]}
			value={item.value}
			control={control}
		/>
	</div>
        		) : null;
        	}
				})}
			</div>
		</div>
	);
}

export default FormElement;
