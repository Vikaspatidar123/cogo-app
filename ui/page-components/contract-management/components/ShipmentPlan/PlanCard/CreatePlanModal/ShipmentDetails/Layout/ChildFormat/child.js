import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';

import FieldArrayComponent from './FieldArrayComponent';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import getWidth from '@/ui/page-components/checkout/utils/getWidth';

function Child({
	controls,
	listLength,
	control,
	index,
	name,
	remove,
	schedule,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
	handleAppendChild = () => { },
	showButtons,
	isEditPlan,
	vesselOptionsLength,
}) {
	return (
		<div style={{ borderBottom: '1px dashed #a5a5a5' }}>
			<div className={`${styles.styled_row} form-fields-${name}-${index}`}>

				{controls.map((controlItem) => {
					const { type = '', label } = controlItem;

					if (!controlItem) {
						return null;
					}
					if (type === 'fieldArray') {
						const arrayName = `create_plan.${index}.sub_create_plan`;

						return (
							<FieldArrayComponent
								key={`child_format_${index}`}
								{...controlItem}
								name={arrayName}
								control={control}
								vesselOptionsLength={vesselOptionsLength}
							/>

						);
					}

					const Element = getField(controlItem.type);
					if (!Element) return null;

					return (
						<>
							{label ? <div className={styles.label}>{label}</div> : null}

							<Element
								{...controlItem}
								style={{ width: getWidth(controlItem?.span) }}
							// width="100%"
								control={control}
								key={`${name}.${index}.${controlItem.name}`}
								id={`${name}.${index}.${controlItem.name}`}
								name={`${name}.${index}.${controlItem.name}`}
							/>
						</>
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
		</div>
	);
}

export default Child;
