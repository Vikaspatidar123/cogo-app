import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import styles from '../styles.module.css';

import getField from '@/packages/forms/Controlled';

function Item(props) {
	const { remove, control, controls, productInfo, index } = props || {};
	console.log(props, 'props');

	return (
		<>

			{controls.map((field) => {
				// eslint-disable-next-line react/jsx-no-useless-fragment
				if (field?.type === 'hidden') return <></>;
				const Element = getField(field?.type);

				return (
					<div style={{ width: field?.width }} className={cl`${styles.col} ${styles[field?.className]}`}>
						<Element control={control} value={productInfo[field?.name]} {...field} />
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
		</>

	);
}

export default Item;
