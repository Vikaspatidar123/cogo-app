import { cl } from '@cogoport/components';
import React, { forwardRef } from 'react';

import getWidth from '../SearchForm/utils/getWidth';

import CBMCalculator from './CBMCalculator';
import ChildFormat from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';
import TruckTypeFormat from './TruckTypeFormat';

function FormElement({
	controls,
	errors = {},
	showElements = {},
	formValues = {},
	control,
	showButtons = false,
	noScroll = false,
	setValue,
}, ref) {
	return (
		<div className={cl`${styles.container} ${!noScroll ? styles.scroll : ''}`}>
			<div className={styles.row}>
				{controls.map((item) => {
					const show = !(item.name in showElements) || showElements[item.name];
					if (item.type === 'cbm_calculator') {
						return (
							<CBMCalculator
								key={item.name}
								formValues={formValues}
								// onChange={controls[item?.name].onChange}
								setValue={setValue}
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
									noDeleteButtonTill={controls.find(
										(s) => s.name === [item.name],
									)?.noDeleteButtonTill}
									label={item.label}
									formValues={formValues[item.name]}
									error={errors[item.name]}
									showElements={showElements[item.name]}
									control={control}
									ref={ref}

								/>
							</div>
						) : null;
					}

					if (item?.name === 'truck_type') {
						return show ? (
							<div
								className={styles.col}
								style={{ width: item?.span ? getWidth(item?.span) : '100%' }}
							>
								<TruckTypeFormat
									controlItem={item}
									control={control}
									error={errors[item.name]}
									formValue={formValues[item.name]}
									value={item.value}
								/>
							</div>
						) : null;
					}

					return show ? (
						<div
							className={styles.col}
							style={{ width: item?.span ? getWidth(item?.span) : '100%' }}
						>
							<Item
								key={item.name}
								name={item.name}
								{...controls.find((s) => s.name === item.name)}
								formValue={formValues[item.name]}
								error={errors[item.name]}
								value={item.value}
								control={control}
								setValue={setValue}
							/>
						</div>
					) : null;
				})}
			</div>
		</div>
	);
}

export default forwardRef(FormElement);
