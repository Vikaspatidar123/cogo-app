import { Select } from '@cogoport/components';
import { IcCCogoCoin, IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import { OPTIONS } from '../../../constant/options';

import styles from './styles.module.css';

function CartItems({
	cartInfo = {},
	setLoad,
	updateCogostoreCartItem = () => { },
	updateLoading = false,
	setProductStock,
}) {
	const { t } = useTranslation(['cogoStore']);
	const {
		id = '',
		cogopoints = 0,
		quantity = 0,
		product_code = {},
		brand = {},
		product = {},
	} = cartInfo;

	const [productCount, setProductCount] = useState(quantity);

	const { user_purchase_limit = -1, is_stock_available = false } = product;

	const { name = '', logo_urls = [] } = product_code || {};
	const [productImg] = logo_urls || [];
	const { name: brandName = '' } = brand;

	const option = user_purchase_limit === -1
		? OPTIONS
		: OPTIONS.filter((ite) => +ite.value <= user_purchase_limit);

	const deleteItemFromCart = () => {
		updateCogostoreCartItem({
			status   : 'inactive',
			id,
			quantity : 0,
		});
	};
	const onChangeCartNumber = (val) => {
		setProductCount(val);
		setLoad(false);
		updateCogostoreCartItem({
			id,
			quantity: val,
		});
	};

	useEffect(() => {
		setProductStock((prev) => ({ ...prev, [id]: is_stock_available }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [is_stock_available]);

	return (
		<div className={styles.order_details}>
			<div className={styles.order_description}>
				<div className={styles.order_image}>
					<img
						src={productImg}
						alt={t('cogoStore:components_cart_cartItems_image_alt')}
					/>
				</div>

				<div className={styles.order_desc}>
					<div className={styles.order_value}>{name}</div>
					<div className={styles.product_brand}>{brandName}</div>
					<div className={styles.product_price}>
						<IcCCogoCoin width={25} height={25} />
						<div>{cogopoints}</div>
					</div>
				</div>
			</div>
			<div className={styles.order_price}>
				<div className={styles.order_count_update}>
					<div className={styles.select_container}>
						<Select
							type="number"
							value={productCount}
							onChange={onChangeCartNumber}
							placeholder={t(
								'cogoStore:product_details_productInfo_select_placeholder',
							)}
							options={option}
							disabled={updateLoading || !is_stock_available}
							size="sm"
						/>
					</div>
					<IcMDelete
						width={20}
						height={20}
						className={styles.delete_button}
						onClick={deleteItemFromCart}
					/>
				</div>
				{!is_stock_available && (
					<div className={styles.stock}>
						{t('cogoStore:cogostore_components_out_of_stock')}
					</div>
				)}
			</div>
		</div>
	);
}

export default CartItems;
