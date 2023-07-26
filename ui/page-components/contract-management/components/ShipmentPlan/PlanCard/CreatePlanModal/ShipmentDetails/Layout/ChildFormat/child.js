import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import getWidth from '@/ui/page-components/contract-management/utils/getWidth';

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
}) {
	return (
		<div className={`${styles.styled_row} form-fields-${name}-${index}`}>
			<div className={styles.shipment_no} style={{ width: '23%' }}>
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
					<div className={styles.list} style={{ width: getWidth(controlItem?.span) }}>
						{' '}
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
