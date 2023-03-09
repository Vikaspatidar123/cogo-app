import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import styles from '../styles.module.css';

import getField from '@/packages/forms/Controlled';

function Item(props) {
	const { remove, control, controls, info, index } = props || {};
	return (
		<div className={cl`${styles.flex_box} ${styles.row}`}>

			{controls.map((field) => {
				// eslint-disable-next-line react/jsx-no-useless-fragment
				if (field?.type === 'hidden') return <></>;
				if (field?.type === 'chargeName') {
					return (
						<p className={cl`${styles.label} ${styles.incoterm_charge_label}`}>{info?.name}</p>
					);
				}
				const Element = getField(field?.type);

				return (
					<div style={{ width: field?.width }} className={cl`${styles[field?.className]}`}>
						<Element control={control} value={info[field?.name]} {...field} />
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
