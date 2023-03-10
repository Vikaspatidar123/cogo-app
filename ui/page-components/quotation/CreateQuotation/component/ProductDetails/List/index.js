import { cl } from '@cogoport/components';
// import { isEmpty } from '@cogoport/utils';

import { productFieldArr } from '../../../configuration/productControls';

import FormItem from './FormItem';
import Item from './Item';
import styles from './styles.module.css';

import { useForm, useFieldArray } from '@/packages/forms';

function List() {
	const {
		control,
	} = useForm();

	const { fields, append, remove } = useFieldArray({
		name: 'products',
		control,
	});

	// if (isEmpty(fields)) {
	// 	append({
	// 		productId           : '7419c4ce-f14d-4c72-b783-c89985e091e6',
	// 		name                : 'ak47',
	// 		description         : 'horse power 740 watt',
	// 		hsCode              : '93011090',
	// 		quantity            : '',
	// 		productCurrency     : 'INR',
	// 		productExchangeRate : 1,
	// 		price               : '66.0000',
	// 		product_price       : '',
	// 		discountAmount      : 0,
	// 		taxAmount           : 0,
	// 		actualPrice         : '66.0000',
	// 		id                  : '6fd13417-708b-45ea-888c-f02a4dd9b346',
	// 	});
	// }
	return (
		<>
			<div className={styles.container}>
				<FormItem append={append} />

				<div className={styles.product_list}>
					{(fields || []).map((field, index) => (
						<div className={styles.product_line_items}>
							<div className={styles.row}>
								<Item
									key={field?.id}
									{...productFieldArr}
									productInfo={field}
									control={control}
									remove={remove}
									index={index}
									controls={productFieldArr[0]?.controls}
								/>
							</div>
						</div>
					))}
				</div>

			</div>
			<div className={cl`${styles.row} ${styles.total_value}`}>
				<h3>
					Consignment Total :0
					{/* {shortFormatNumber(calTotalPrice(), currency || 'INR') || 0} */}
				</h3>
			</div>
		</>

	);
}

export default List;
