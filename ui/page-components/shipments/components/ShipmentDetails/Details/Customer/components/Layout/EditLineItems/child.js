import { IcMDelete } from '@cogoport/icons-react';

import Item from '../Item';

import styles from './styles.module.css';

import getWidth from '@/ui/page-components/shipments/utils/getWidth';

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
	formValues,
	themeType,
	total,
	isMobile,
	disableServiceEdit = false,
}) {
	return (
		<div
			className={styles.child}
			key={field.id}
		>
			<div className={styles.row}>
				{controls.map((controlItem) => {
					const { span = 6, watch = true, render } = controlItem;
					const show = !(controlItem.name in showElements) || showElements[controlItem.name];
					if (controlItem.type === 'static') {
						return (
							<div className={styles.col}>
								{render ? (
									render(formValues)
								) : (
									<p className={styles.item_value}>{formValues?.[controlItem.name] || '--'}</p>
								)}
							</div>
						);
					}
					const extraProps = {};
					if (controlItem.options) {
						if (Array.isArray(controlItem.options)) {
							extraProps.options = controlItem.options;
						} else {
							extraProps.options = controlItem.options[index];
						}
					}
					if (watch) {
						return show ? (
							<div className={styles.col} style={{ width: getWidth(span)}}>
								<Item
									control={control}
									{...controlItem}
									key={`${name}.${index}.${controlItem.name}`}
									itemKey={`${name}.${index}.${controlItem.name}`}
									name={`${name}.${index}.${controlItem.name}`}
									value={field[controlItem.name]}
									error={error?.[controlItem.name]}
									id_prefix={id_prefix}
									disabled={controlItem.disabled || disabled}
									themeType={themeType}
									label={!isMobile ? null : controlItem.label}
									{...extraProps}
								/>
							</div>
						) : null;
					}

					return show ? (
						<div className={styles.col} style={{ width: getWidth(span) }}>
							<Item
								control={control}
								{...controlItem}
								key={`${name}.${index}.${controlItem.name}`}
								{...register(`${name}.${index}.${controlItem.name}`, {
									...(controlItem.rules || {}),
								})}
								defaultValue={field[controlItem.name]}
								error={error?.[controlItem.name]}
								id_prefix={id_prefix}
								disabled={disabled}
								themeType={themeType}
								label={!isMobile ? null : controlItem.label}
								{...extraProps}
							/>
						</div>
					) : null;
				})}

				{showDeleteButton
			&& index >= noDeleteButtonTill
			&& !disabled
			&& total > 1 ? (
				<div
					className={styles.col}
					style={{
						display        : 'flex',
						alignItems     : 'center',
						justifyContent : 'center',
					}}
				>
					<div
						className={styles.remove_icon}
						style={
							!disableServiceEdit
								? { cursor: 'pointer' }
								: { cursor: 'not-allowed', opacity: '0.5' }
						}
					>
						<IcMDelete
							onClick={!disableServiceEdit ? () => remove(index, 1) : null}
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
