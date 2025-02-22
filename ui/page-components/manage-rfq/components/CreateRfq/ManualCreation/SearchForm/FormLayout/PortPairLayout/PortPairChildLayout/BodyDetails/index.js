import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';

import BodyDetailsChildFormat from './BodyDetailsChildFormat';
import styles from './styles.module.css';

import { useFieldArray } from '@/packages/forms';

const labelMapping = {
	fcl_freight : 'Container',
	lcl_freight : 'Cargo',
	air_freight : 'Package',
};

function BodyDetails(props) {
	const {
		mode,
		name,
		container_name,
		container_index,
		control,
		controls,
		error,
		types,
		watch,
		handleIndex,
		index: indexnumber,
		showElements = {},
		buttonText,
		setValue,
		hscodeDetails,
		setHscodeDetails = () => {},
		watchSearchRates,
		shippingLinesDetails,
		setShippingLinesDetails,
	} = props;

	const locationName = `${container_name}.${container_index}.${name}`;
	const checkFieldArray = watchSearchRates?.[container_index]?.[name] || [];
	const { fields, remove, append } = useFieldArray({
		control,
		name: locationName,
	});

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = '';
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{name === 'remarks'
					? 'Additional Remarks'
					: `${labelMapping[mode]} Details`}
			</div>
			<div className={styles.field_wrapper}>
				{(fields || []).map((field, index) => (
					<div key={field.id} className={styles.card_wrapper}>
						<div className={styles.card} id={field.id}>
							<BodyDetailsChildFormat
								{...field}
								mode={mode}
								id={field.id}
								types={types}
								watch={watch}
								field={field}
								index={index}
								control={control}
								controls={controls}
								name={name}
								setValue={setValue}
								hscodeDetails={hscodeDetails}
								setHscodeDetails={setHscodeDetails}
								containersListLength={fields.length}
								locationName={locationName}
								remove={remove}
								handleIndex={handleIndex}
								error={error?.[index]}
								showElements={showElements?.[index]}
								buttonText={buttonText}
								indexnumber={indexnumber}
								checkFieldArray={checkFieldArray}
								container_index={container_index}
								shippingLinesDetails={shippingLinesDetails}
								setShippingLinesDetails={setShippingLinesDetails}
							/>
						</div>
					</div>
				))}
			</div>

			{!['remarks', 'containers'].includes(name) && (
				<div className={styles.btn_container}>
					<Button onClick={() => append(childEmptyValues)}>
						Add
						{' '}
						{buttonText}
						{' '}
						<IcMPlus className={styles.plusicon} />
					</Button>
				</div>
			)}
		</div>
	);
}

export default BodyDetails;
