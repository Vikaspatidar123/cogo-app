import { Button } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import getControls from '../controls';

import FormComponent from './FormComponent';
import getSinglePackageDetails from './hooks/getSinglePackageDetails';
import getSimilarPackageClubbing from './hooks/useSimilarPackageClubbing';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

import { useForm, useFieldArray } from '@/packages/forms';

function PerPackageCargoDetails({
	setShowPopover = () => {},
	showFilledValues = {},
	setShowFilledValues = () => {},
}) {
	const [selectedWeightType, setSelectedWeightType] = useState(
		showFilledValues?.perPackagedata?.weightType || 'weight_by_unit',
	);

	const controls = getControls({
		selectedWeightType,
		setSelectedWeightType,
	});

	const {
		formState,
		handleSubmit,
		watch,
		setValue,
		getValues,
		control,
		register,
	} = useForm({
		defaultValues: {
			packages: !isEmpty(showFilledValues?.perPackagedata?.packages)
				? showFilledValues?.perPackagedata?.packages
				: [
					{
						dimensions_unit : 'cm',
						weight_unit     : 'kg_unit',
						handling_type   : 'stackable',
					},
				],
		},
	});

	const { errors } = formState;

	// const {
	// 	name,
	// 	register,
	// 	control:fieldControl,
	// 	controls: newControls,
	// } = field.packages || {};

	const { fields, append, remove } = useFieldArray({ control, name: 'packages' });

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		if (controlItem.name === 'handling_type') {
			childEmptyValues[controlItem.name] = controlItem.value || 'stackable';
		} else if (controlItem.name === 'weight_unit') {
			childEmptyValues[controlItem.name] = `kg_${
				selectedWeightType.split('_')[2]
			}`;
		} else {
			childEmptyValues[controlItem.name] = controlItem.value;
		}
	});

	useEffect(() => {
		const weightUnit =	selectedWeightType === 'weight_by_unit' ? 'kg_unit' : 'kg_total';
		const packages = getValues('packages');
		const prefilledPackages = showFilledValues?.perPackagedata?.packages;
		packages.forEach((item, index) => {
			if (
				prefilledPackages
				&& prefilledPackages?.[0]?.weight_unit?.split('_')[1]
					=== selectedWeightType.split('_')[2]
			) {
				setValue(
					`packages.${index}.weight_unit`,
					showFilledValues?.perPackagedata?.packages[index]?.weight_unit,
				);
			} else {
				setValue(`packages.${index}.weight_unit`, weightUnit);
			}
		});
	}, [selectedWeightType]);

	const onSubmit = (data) => {
		const newData = getSimilarPackageClubbing({ data });
		setShowFilledValues({
			perPackagedata: {
				...newData,
				weightType: selectedWeightType,
			},
		});
		setShowPopover(false);
	};

	const {
		packageQuantity = [],
		packageWeight = [],
		packageVolume = [],
	} = getSinglePackageDetails({ watch });

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div style={{ maxHeight: 200, overflowY: 'auto', overflowX: 'hidden' }}>

					{(fields || []).map((item, index) => (
						<div style={{ marginBottom: 2 }}>
							<FormComponent
								key={item.id}
								field={item}
								index={index}
								register={register}
								control={control}
								controls={controls}
								name="packages"
								onClickDelete={() => {
									remove(index);
								}}
								error={errors?.packages?.[index]}
								packageQuantity={packageQuantity}
								packageWeight={packageWeight}
								packageVolume={packageVolume}
							/>
						</div>
					))}

					<div className={styles.button_container}>
						<Button
							themeType="tertiary"
							onClick={() => append(childEmptyValues)}
						>
							<IcMPlusInCircle
								fill="#7a5ef3"
								width={16}
								height={16}
								style={{ marginRight: 8 }}
							/>
							Add package
						</Button>
					</div>
				</div>
				<div className={styles.confirm_button}>
					<div className={styles.package_details}>
						<ShipmentDetails
							packageQuantity={packageQuantity}
							packageWeight={packageWeight}
							packageVolume={packageVolume}
						/>
					</div>

					<div style={{ display: 'flex' }}>
						<Button
							themeType="secondary"
							onClick={() => setShowPopover(false)}
							style={{ marginRight: 8 }}
						>
							CANCEL
						</Button>

						<Button type="submit">
							CONFIRM
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default PerPackageCargoDetails;
