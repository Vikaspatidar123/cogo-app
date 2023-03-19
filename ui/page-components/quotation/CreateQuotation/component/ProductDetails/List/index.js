import { cl } from '@cogoport/components';
import {
	useCallback,
	forwardRef,
	useImperativeHandle,
	useMemo,
	useEffect,
	useRef,
} from 'react';

import { productFieldArr } from '../../../configuration/productControls';
import useCurrencyConversion from '../../../hooks/useCurrencyConversion';

import FormItem from './FormItem';
import Item from './Item';
import styles from './styles.module.css';

import { useForm, useFieldArray } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';
import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

function List(props, ref) {
	const { selectedData = [], setSelectedId, editProduct = [], watchCurrency } = props || {};

	const profileCurrency = useSelector((state) => state.profile.organization.country.currency_code);

	const { query } = useRouter();

	const initialRef = useRef({ initialRender: true, refCurrency: '' });
	const { getExchangeRate } = useCurrencyConversion({});
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

	const newCurrency = async () => {
		if (watchCurrency && profileCurrency) {
			const baseCurr = query?.id ? initialRef.current.refCurrency : profileCurrency;
			const currencyRate = await getExchangeRate(baseCurr, watchCurrency);
			(fields || []).forEach((field, index) => {
				const { quantity, actualPrice } = watchFieldArr[index];
				const sellingPrice = actualPrice * currencyRate;
				const totalPrice = quantity * sellingPrice;
				setValue(`products.${index}.productExchangeRate`, currencyRate);
				setValue(`products.${index}.price`, sellingPrice.toFixed(4));
				setValue(`products.${index}.product_price`, totalPrice.toFixed(4));
				setValue(`products.${index}.productCurrency`, watchCurrency);
			});
		}
	};

	useEffect(() => {
		if (initialRef.current.initialRender) {
			initialRef.current.initialRender = false;
			initialRef.current.refCurrency = watchCurrency;
		} else {
			newCurrency();
		}
	}, [watchCurrency]);

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
					watchCurrency={watchCurrency}
					getExchangeRate={getExchangeRate}
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
					{shortFormatNumber(calTotalPrice(), watchCurrency) || 0}
				</h3>
			</div>
		</>
	);
}

export default forwardRef(List);
