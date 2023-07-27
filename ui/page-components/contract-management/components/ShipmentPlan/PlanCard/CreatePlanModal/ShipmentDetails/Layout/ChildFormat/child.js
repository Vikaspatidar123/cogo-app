import { IcMDelete } from '@cogoport/icons-react';

import FieldArrayComponent from './FieldArrayComponent';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function Child({
	controls,
	listLength,
	control,
	index,
	name,
	remove,
	schedule,
	disabled = false,
	handleAppendChild = () => { },
	showButtons,
	isEditPlan,
	vesselOptionsLength,
}) {
	return (
		<>
			{' '}
			<div className={styles.container}>
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
									control={control}
									key={`${name}.${index}.${controlItem.name}`}
									id={`${name}.${index}.${controlItem.name}`}
									name={`${name}.${index}.${controlItem.name}`}
								/>
							</>
						);
					})}
				</div>
			</div>

			{schedule === 'randomly' && !isEditPlan && (

				<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
					{showButtons && !disabled && index === listLength - 1 ? (

						<>
							<div role="presentation" className={styles.remove_icon} onClick={() => remove(index, 1)}>
								Delete Prev
								<IcMDelete width={16} height={16} />
							</div>

							<div role="presentation" className={styles.add_icon} onClick={() => handleAppendChild()}>
								+ Add New
							</div>
						</>
					) : null}

				</div>
			)}

		</>

	);
}

export default Child;
