import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useEffect, useRef } from 'react';

import ChildFormat from '../FormElement/ChildFormat';

import controls from './controls';
import styles from './styles.module.css';

import { useForm, SelectController } from '@/packages/forms';

const calculateVolume = (packages, unit) => {
	if (packages.length > 0) {
		let volume = 0;
		packages.forEach((singlepackage) => {
			const packageVolume = ((singlepackage.dimensions || {}).length || 0)
        * ((singlepackage.dimensions || {}).width || 0)
        * ((singlepackage.dimensions || {}).height || 0);
			const originalPackageVolume = packageVolume / Number(unit) ** 3;
			volume += Number(singlepackage.no_of_pieces || 1) * originalPackageVolume;
		});
		return volume;
	}
	return 0;
};

const calculateWeight = (packages) => {
	if (packages.length > 0) {
		let weight = 0;
		packages.forEach((singlepackage) => {
			weight
        += Number(singlepackage.no_of_pieces || 1) * (singlepackage?.weight || 0);
		});
		return weight;
	}
	return 0;
};

function Calculator({ onChange = () => {}, onBack, value }) {
	const ref = useRef({});
	const { fields, watch, control } = useForm();
	console.log(controls, 'controls');
	useEffect(() => {
		const subscription = watch((formValues) => {
			const volume = calculateVolume(
				formValues.packages,
				formValues.selected_unit,
			);
			const weight = calculateWeight(formValues.packages);
			const packageArr = formValues?.packages;

			const packages = [];

			(packageArr || []).forEach((obj) => {
				packages.push({
					...obj?.dimensions,
					packages_count : obj?.no_of_pieces,
					packing_type   : 'pallet',
				});
			});

			onChange({
				weight : !weight ? 1 : weight,
				volume : !volume ? 1 : volume,
				packages,
			});
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const style = {
		control: {
			fontSize   : '12px',
			lineHeight : '14px',
			color      : 'black',
			width      : '120px',
			minHeight  : '25px',
			height     : '25px',
		},
		indicatorsContainer: { height: '25px' },
	};

	return (
		<div className={styles.container}>
			<div className={styles.space_between}>
				<div className={styles.label}>
					<button className={styles.back} type="button" onClick={onBack}>
						<IcMArrowBack size={1.4} />
					</button>
					Vol. & Weight
				</div>
				<SelectController
					name="selected_unit"
					{...controls[0]}
					control={control}
					style={style}
				/>
			</div>
			<div className={styles.row}>
				<div
					className={styles.col}
					style={{ paddingLeft: 8, paddingRight: 0, marginBottom: 4 }}
				>
					<div className={styles.calc_label}>No. of packages</div>
				</div>
				<div
					className={styles.col}
					style={{ paddingLeft: 0, paddingRight: 0, marginBottom: 4 }}
				>
					<div className={styles.calc_label}>Dimensions</div>
				</div>
				<div
					className={styles.col}
					style={{ paddingLeft: 0, paddingRight: 0, marginBottom: 4 }}
				>
					<div className={styles.calc_label}>Weight(per pkg)</div>
				</div>
				<div className={styles.col}>
					<ChildFormat
						name="packages"
						{...controls[1]}
						control={control}
						showButtons={false}
						showDeleteButton
						deletePosition="front"
						noDeleteButtonTill={0}
						ref={(r) => {
            	        ref.current = r;
						}}
					/>
				</div>
				<div
					className={styles.col}
					style={{ paddingLeft: 8, paddingRight: 4, marginTop: 8 }}
				>
					<Button type="button" onClick={() => ref.current.handleAppendChild()}>
						+ ADD MORE
					</Button>
				</div>
				<div
					className={styles.col}
					style={{ paddingLeft: 4, paddingRight: 4, marginTop: 8 }}
				>
					<div className={styles.chip}>
						{`= ${value?.volume?.toFixed(9)} m`}
						<sup>3</sup>
					</div>
				</div>
				<div
					className={styles.col}
					style={{ paddingLeft: 4, paddingRight: 4, marginTop: 8 }}
				>
					<div className={styles.chip}>
						{`= ${value?.weight?.toFixed(
							9,
						)} Kgs`}

					</div>
				</div>
			</div>
		</div>
	);
}

export default Calculator;
