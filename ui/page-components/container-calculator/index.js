import { Button } from '@cogoport/components';
import React, { useState } from 'react';

// import ContainerIcon from '../../common/icons/containerIcon.svg';
// import Eye from '../../common/icons/eyeIcon.svg';

// import { addRemoveCheckBoxFunction } from './addRemoveCheckboxFunction';
import ChildFormat from './ChildFormat';
import getControls from './controls/CalculatorControl';
import StuffingResult from './stuffing-result';
import styles from './styles.module.css';

import { useForm, useFieldArray } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function ContainerCalculator() {
	// const data = [
	// 	{
	// 		name  : '20 Feet',
	// 		id    : 1,
	// 		value : 'twentyFeet',
	// 	},
	// 	{
	// 		name  : '40 Feet',
	// 		id    : 2,
	// 		value : 'fourtyFeet',
	// 	},
	// 	{
	// 		name  : '40 High Cube',
	// 		id    : 3,
	// 		value : 'fourtyHighCube',
	// 	},
	// ];

	const item = getControls();

	const [show, setShow] = useState(false);
	const [formValue, setFormValue] = useState([]);
	const [addProductId, setaddProductId] = useState([1]);
	const [checked, setChecked] = useState({
		twentyFeet     : true,
		fourtyFeet     : false,
		twentyHighCube : false,
	});

	const { control, handleSubmit } = useForm({
		defaultValues: {
			test: [{ name: 'useFieldArray' }],
		},
	});

	const { fields, append, remove } = useFieldArray(
		{
			control,
			name: 'containerCalculator',
		},

	);

	console.log(fields, 'calculationField');

	// const checkedData = data.filter((x) => addProductId.includes(x.id));

	const onSubmit = (data) => console.log('data', data);

	// const submit = (values) => {
	// 	setFormValue(values);
	// 	setShow(true);
	// };

	// const addRemoveCheckBox = addRemoveCheckBoxFunction({
	// 	addProductId,
	// 	setaddProductId,
	// 	checked,
	// 	setChecked,
	// });

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ul>
					<div className={styles.row}>
						{fields.map((field, index) => {
							const Element = getField(field.type);
							const value = 'item';
							return (
								<li key={index.id}>
									<div className={`${styles} ${styles.col}`}>
										<div className={styles.label}>{field.label}</div>
										<Element {...item} control={control} />
										<button type="button" onClick={() => remove(index)}>
											remove
										</button>
									</div>
								</li>
							);
						})}
					</div>
				</ul>

				<section>
					<button
						type="button"
						onClick={() => { append({ name: 'append' }); }}
					>
						append
					</button>
				</section>

				<input type="submit" />
			</form>
			{/* {!show && (
				<>
					<div className={styles.containesr_background}>
						<ContainerIcon width="300" height="170" />
						<div style={{ margin: '75px 0px 0px' }}>
							<div className={styles.header}>Container Loading Calculator</div>
							<div className={styles.sub_title}>
								Use this calculator to easily calculate how many items with particular
								dimensions you can fit in a container.
							</div>
						</div>
					</div>
					<div className={styles.checked_box} />
					<div className={styles.container}>
						<div className={styles.checked_box}>
							<div className={styles.title}>Packages</div>
							<div style={{ display: 'flex', marginRight: '20px' }}>
								{(data || []).map((x) => (
									<>
										<StyledCheckbox
											checked={addProductId.includes(x.id)}
											onChange={() => {
												addRemoveCheckBox(x);
											}}
										/>
										<div className={styles.text}>
											{' '}
											{x.name}
										</div>
									</>
								))}
							</div>
						</div>

						<form>
							<div className={styles.row}>
								{fields.map((field) => {
									const Element = getField(field.type);
									return (
										<div className={`${styles} ${styles.col}`}>
											<div className={styles.label}>{field.label}</div>
											<Element {...field} control={control} />
										</div>
									);
								})}
							</div>
						</form>

						<form onSubmit={handleSubmit(submit)}>
							<div style={{ padding: '15px' }}>
								<ChildFormat errors={errors} control={control} {...fields.containerCalculator} />
							</div>
							<div className={styles.button_wrap}>
								<Button type="submit">
									<Eye />
									{' '}
									View Result
								</Button>
							</div>
						</form>
					</div>
				</>
			 )} */}
			{show && (
				<StuffingResult
					show={show}
					formValue={formValue}
					setShow={setShow}
					checked={checked}
					checkedData={checkedData}
				/>
			)}
		</>
	);
}

export default ContainerCalculator;
