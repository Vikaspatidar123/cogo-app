// import CargoDetailPills from '@cogo/business-modules/components/cargo-details';
// import { Button } from '@cogoport/front/components';
// import { useFieldArray } from '@cogoport/front/hooks';
// import styled from '@cogoport/front/styled';
// import { isEmpty } from '@cogoport/front/utils';
// import React from 'react';
// // import incoTermMapping from '@cogo/shipments/configurations/common/inco-term-mapping.json';
import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useFieldArray } from 'react-hook-form';

import CargoDetailPills from '../../../../../../CargoDetails/CargoDetailPills';

import Child from './child';
import Header from './Header';
import styles from './styles.module.css';
// import Child from './child';
// import Header from './Header';

function EditLineItems({
	name,
	control,
	register,
	controls,
	error,
	showElements,
	buttonText,
	heading,
	showButtons = true,
	disabled = false,
	customValues,
	isMobile,
	// disabledProps = false,
	cargoDetails = {},
	value = [],
	service_name = '',
	// incoTerm = '',
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const disableServiceEdit = false;

	const disableAddLineItem =	service_name === 'subsidiary_service' && value.length > 0;

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});
	console.log(childEmptyValues, controls, 'vansh', name, fields, control);
	const className = `form_fieldArray_${name}`;
	return (
		<div
			className={`${styles.container} ${styles.form_edit_line_items_root} ${styles[className]}`}
		>
			{!isEmpty(cargoDetails) ? (
				<div className="cargo_details">
					<CargoDetailPills detail={cargoDetails} />
				</div>
			) : null}

			<Header controls={controls} isMobile={isMobile} />

			{(fields || [])?.map((field, index) => (
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
					formValues={customValues?.formValues?.[index]}
					disabled={disabled}
					total={fields?.length}
					isMobile={isMobile}
					disableServiceEdit={disableServiceEdit}
				/>
			))}

			{showButtons && !disabled ? (
				<div className={`${styles.button_wrap} ${disableAddLineItem ? styles.disable : ''}`}>
					<Button
						disabled={disableAddLineItem}
						onClick={() => append(childEmptyValues)}
					>
						<div>+</div>
						{buttonText || 'ADD'}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default EditLineItems;
