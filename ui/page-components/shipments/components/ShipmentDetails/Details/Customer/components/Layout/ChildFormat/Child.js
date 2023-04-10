import { IcMDelete } from '@cogoport/icons-react';

import Item from '../Item';

import styles from './styles.module.css';

function Child({
	controls,
	control,
	register,
	field,
	index,
	name,
	remove,
	error,
	showElements = {},
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
	id_prefix = null,
	customLabels = {},
	themeType,
}) {
	return (
		<div className={styles.child} key={field.id}>
			<div className={styles.row} style={{ width: '102%' }}>
				{index !== 0 ? <div className={`${styles.Line_row} ${styles.line}`} /> : null}

				{controls.map((controlItem) => {
					const { span = 6, watch = true, show = true, name: itemName } = controlItem;
					const elemShow = (!(controlItem.name in showElements)
						|| showElements[controlItem.name])
					&& show;

					if (watch) {
						return elemShow ? (
							<div className={styles.col}>
								<Item
									{...controlItem}
									control={control}
									key={`${name}.${index}.${itemName}`}
									itemKey={`${name}.${index}.${itemName}`}
									name={`${name}.${index}.${itemName}`}
									value={field[controlItem.name]}
									error={error?.[controlItem.name]}
									id_prefix={id_prefix}
									disabled={controlItem.disabled || disabled}
									label={customLabels[controlItem.name] || controlItem.label}
									themeType={themeType}
								/>
							</div>
						) : null;
					}

					return elemShow ? (
						<div className={styles.col}>
							<Item
								{...controlItem}
								key={`${name}.${index}.${controlItem.name}}`}
								{...register(`${name}.${index}.${controlItem.name}`, {
									...(controlItem.rules || {}),
								})}
								defaultValue={field[controlItem.name]}
								error={error?.[controlItem.name]}
								id_prefix={id_prefix}
								disabled={disabled}
								themeType={themeType}
								label={customLabels[controlItem.name] || controlItem.label}
								control={control}
							/>
						</div>
					) : null;
				})}
				{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
					<div
						className={styles.col}
						style={{
							display        : 'flex',
							alignItems     : 'center',
							justifyContent : 'center',
							marginTop      : 'auto',
						}}
					>
						<div className={styles.remove_icon}>
							<IcMDelete
								onClick={() => remove(index, 1)}
								style={{ width: '2em', height: '2em' }}
							/>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}
export default Child;
