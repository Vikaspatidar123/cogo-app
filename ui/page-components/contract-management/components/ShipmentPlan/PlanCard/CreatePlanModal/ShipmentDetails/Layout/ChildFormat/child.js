// import Item from '@cogo/business-modules/form/Layout/Item';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function Child({
	controls,
	listLength,
	control,
	field,
	index,
	name,
	remove,
	error,
	schedule,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
	themeType,
	handleAppendChild = () => {},
	showButtons,
	isEditPlan,
}) {
	console.log(controls, 'controls1232');
	return (
		<div className={`${styles.styled_row} form-fields-${name}-${index}`}>
			<div className={styles.shipment_no}>
				{index + 1}
				{index + 1 === 1 && 'st'}
				{index + 1 === 2 && 'nd'}
				{index + 1 === 3 && 'rd'}
				{index + 1 > 3 && 'th'}
				{' '}
				Shipment
			</div>

			{controls.map((controlItem) => {
				const Element = getField(controlItem.type);
				if (!Element) return null;
				return (
					<div className={styles.list}>
						<div className={styles.label}>{controlItem.label}</div>
						<Element
							{...controlItem}
							width="100%"
							control={control}
							key={`${name}.${index}.${controlItem.name}`}
							id={`${name}.${index}.${controlItem.name}`}
							name={`${name}.${index}.${controlItem.name}`}
						/>
					</div>
				);
			})}

			{schedule === 'randomly' && !isEditPlan && (
				<>
					{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
						<div className={styles.remove_icon}>
							<IcMDelete
								width={20}
								height={20}
								onClick={() => remove(index, 1)}
							/>
						</div>
					) : null}
					{showButtons && !disabled ? (
						<div className={styles.add_icon}>
							{index === listLength - 1 && (
								<IcMPlusInCircle
									width={20}
									height={20}
									onClick={() => handleAppendChild()}
								/>
							)}
						</div>
					) : null}
				</>
			)}
		</div>
	);
}

export default Child;
