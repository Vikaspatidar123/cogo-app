import { cl } from '@cogoport/components';
import {
	useCallback,
	forwardRef,
	useImperativeHandle,
	useMemo,
	useEffect,
} from 'react';

import { productFieldArr } from '../../../configuration/productControls';

import FormItem from './FormItem';
import Item from './Item';
import styles from './styles.module.css';

import { useForm, useFieldArray } from '@/packages/forms';
import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

function List(props, ref) {
	const { selectedData = [], setSelectedId, editProduct } = props || {};
	const {
		control,
		watch,
		setValue = () => {},
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { fields, remove, prepend } = useFieldArray({
		name: 'products',
		control,
	});
	const { products: watchFieldArr } = watch();
	const calTotalPrice = useCallback(() => {
		const value = watchFieldArr?.reduce(
			(prevObj, currObj) => +prevObj + +currObj.product_price,
			0,
		);
		return value;
	}, [watchFieldArr]);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => values;

			const onError = (err) => ({ check: true, err });

			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
		totalProductValue: calTotalPrice(),
	}));
	// useMemo(() => { setSelectedId(watchFieldArr.map((x) => x.id)); }, [watchFieldArr]);
	useMemo(() => {
		setValue(
			'products',
			(selectedData || []).map((item) => ({
				...item,
				price     : item.sellingPrice,
				productId : item.id,
			})),
		);
	}, [selectedData]);

	useEffect(() => { setSelectedId((watchFieldArr || []).map((x) => x.productId)); }, [watchFieldArr]);

	useEffect(() => {
		if (editProduct.length > 0) {
			setValue('products', editProduct);
		}
	}, [editProduct.length]);

	return (
		<>
			<div className={styles.container}>
				<FormItem
					prepend={prepend}
					watchList={watch}
					setValueList={setValue}
					watchFieldArr={watchFieldArr}
				/>

				<div className={styles.product_list}>
					{(fields || []).map((field, index) => (
						<div key={field?.id} className={styles.product_line_items}>
							<div className={styles.row}>
								<Item
									key={field?.id}
									productInfo={field}
									remove={remove}
									index={index}
									control={control}
									controls={productFieldArr[0]?.controls}
									watch={watch}
									setValue={setValue}
									errors={errors?.products}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={cl`${styles.row} ${styles.total_value}`}>
				<h3>
					Consignment Total :
					{shortFormatNumber(calTotalPrice(), 'INR') || 0}
				</h3>
			</div>
		</>
	);
}

export default forwardRef(List);
