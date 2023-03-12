/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { productFormControls, resetObj } from '../../../../configuration/productControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';

function FormItem(props) {
	const { editData = {}, prepend, watchList, watchFieldArr = [], setValueList } = props;
	const { id } = useSelector((state) => state.profile);
	const [productForm, setProductForm] = useState({});

	const { control, setValue, handleSubmit, watch, formState: { errors }, reset } = useForm();

	const checkEdit = Object.keys(editData).length > 0;
	const { id: productId = null } = productForm || {};
	const productFields = productFormControls({ id, checkEdit });
	const { name, quantity } = watch();

	useEffect(() => {
		if (productId) {
			const {
				name: productName,
				description: productDescription,
				hsCode,
				quantity: productQuantity,
				sellingPrice,
				currency: productCurrency,
			} = productForm;
			setValue('productId', productId);
			setValue('name', productName);
			setValue('description', productDescription);
			setValue('hsCode', hsCode);
			setValue('quantity', productQuantity);
			setValue('price', sellingPrice);
			setValue('productCurrency', productCurrency);
		}
	}, [productId]);

	// const errorHandler = () => {
	// 	const errorArr = Object.keys(errors);

	// 	errorArr.map
	// };
	// useEffect(() => {}, [errors]);

	const changeHandler = (field, data) => {
		if (field?.name !== 'name') return;
		setProductForm(data);
	};
	const onSubmit = async (data) => {
		const {
			name: productName = '',
			description: proDescription = '',
			hsCode = '',
			productCurrency = 'INR',
			price = 0,
		} = data || {};

		const updateIndex = watchFieldArr.findIndex((ele) => ele?.productId === productId);
		if (name && updateIndex < 0) {
			prepend({
				productId,
				name                : productName,
				description         : proDescription,
				hsCode,
				quantity,
				productCurrency,
				productExchangeRate : 1,
				price               : (price).toFixed(4),
				actualPrice         : price,
			});
			setProductForm({});
			reset({ ...resetObj });
		} else {
			const oldQuantity = watchList(`products.${updateIndex}.quantity`) || 0;
			if (quantity > 0) {
				// fields[updateIndex].quantity = +oldQuantity + +quantity;
				setValueList(`products.${updateIndex}.quantity`, +oldQuantity + +quantity);
				setProductForm({});
				reset({ ...resetObj });
			}
		}
	};

	return (
		<div className={styles.row}>
			{(productFields || []).map((field) => {
				// eslint-disable-next-line react/jsx-no-useless-fragment
				if (field?.type === 'hidden') return <></>;
				const Element = getField(field?.type);
				return (
					<div
						key={field?.name}
						className={cl`${styles.col} ${styles?.[field?.className]}`}
						style={{ width: field?.width }}
					>
						<p className={styles.label}>{field?.label}</p>
						<Element
							{...field}
							control={control}
							handleChange={(e) => changeHandler(field, e)}
							className={`${errors?.[field?.name] && styles.error}`}
						/>
					</div>
				);
			})}
			<div className={styles.add_btn} role="presentation" onClick={handleSubmit(onSubmit)}>
				<IcMPlusInCircle width={20} height={20} fill="#356EFD" />
				<span>Add</span>
			</div>
		</div>
	);
}

export default FormItem;
