/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useEffect } from 'react';

import styles from '../styles.module.css';

import getField from '@/packages/forms/Controlled';

function Item(props) {
	const {
		remove, control, controls, productInfo, index, setValue, watch, errors,
	} = props || {};
	const watchFieldArrList = watch('products')[index];
	const { quantity, price } = watchFieldArrList || {};

	useEffect(() => {
		if (quantity > 0 && price > 0) {
			setValue(`products.${index}.product_price`, +quantity * +price);
		}
	}, [quantity, price]);
	return (
		<>

			{controls.map((field) => {
				// eslint-disable-next-line react/jsx-no-useless-fragment
				if (field?.type === 'hidden') return <></>;
				const Element = getField(field?.type);

				return (
					<div
						key={`${field?.name}_${productInfo?.productId}`}
						style={{ width: field?.width }}
						className={cl`${styles.col}
						${errors?.[index]?.[field?.name] && styles.error} ${styles[field?.className]}`}
					>
						<Element
							{...field}
							control={control}
							value={productInfo[field?.name]}
							name={`products.${index}.${field?.name}`}
							key={`products.${index}.${field?.name}`}
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
		</>

	);
}

export default Item;
