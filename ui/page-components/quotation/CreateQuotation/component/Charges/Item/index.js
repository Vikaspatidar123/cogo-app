/* eslint-disable react/jsx-no-useless-fragment */
import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import styles from '../styles.module.css';

import getField from '@/packages/forms/Controlled';

function Item(props) {
	const { remove, control, controls, info, index, name, errors } = props || {};
	// console.log(info, 'info');
	return (
		<div className={cl`${styles.flex_box} ${styles.row}`}>
			{controls.map((field) => {
				if (field?.type === 'hidden') return <></>;
				if (field?.type === 'chargeName') {
					return (
						<p
							key={`${info?.id}_${field.name}`}
							className={cl`${styles.label} ${styles.incoterm_charge_label}`}
						>
							{info?.name}
						</p>
					);
				}
				const Element = getField(field?.type);
				return (
					<div
						key={`${info?.id}_${field.name}`}
						style={{ width: field?.width }}
						className={cl`${errors?.[index]?.[field?.name] && styles.error} ${styles[field?.className]}`}
					>
						<Element
							{...field}
							name={`${name}.${index}.${field.name}`}
							key={`${name}.${index}.${field.name}`}
							control={control}
						/>
					</div>
				);
			})}
			<div
				className={styles.delete_icon}
				role="presentation"
				onClick={() => remove(index, 1)}
			>
				<IcMDelete fill="#e63946 " width={20} height={20} />
			</div>
		</div>
	);
}

export default Item;
