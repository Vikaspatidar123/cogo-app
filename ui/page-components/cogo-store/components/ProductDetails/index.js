import { Breadcrumb, Collapse } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';

import Header from '../../common/Header';
import useCreateCogostoreCartItem from '../../hooks/useCreateCogostoreCartItem';
import useGetCogostoreCartItems from '../../hooks/useGetCogostoreCartItems';
import useGetCogostoreProduct from '../../hooks/useGetCogostoreProduct';
import useListCogoStoreProducts from '../../hooks/useListCogoStoreProducts';
import getProductDetails from '../../utils/getProductDetails';
import StoreCard from '../Main/StoreCard';

import ProductInfo from './ProductInfo';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ProductDetails() {
	const { t } = useTranslation(['cogoStore']);
	const { query, push } = useRouter();
	const { product_code_id } = query;

	const [CollapseValue, setCollapseValue] = useState('');

	const { getCogostoreCartItems, data: cartCount } = useGetCogostoreCartItems({
		only_count_required: true,
	});
	const { createCogostoreCartItem, loading, addToCard, setAddToCard } = useCreateCogostoreCartItem({
		getCogostoreCartItems,
	});

	const { data: listData, getListProducts } = useListCogoStoreProducts();
	const { data: productData, getCogostoreProduct } = useGetCogostoreProduct();

	const { list = [] } = listData || {};

	useEffect(() => {
		getCogostoreProduct({ product_id: product_code_id });
		setAddToCard(false);
	}, [product_code_id, getCogostoreProduct]);

	const {
		cogopoints = 0,
		product_code = {},
		tnc: tncArray = [],
		redeem_steps = [],
		category = {},
		brand = {},
		user_purchase_limit = 0,
	} = productData || {};

	const { display_name, id: category_id = '' } = category;
	const { name } = brand;

	useEffect(() => {
		if (category_id) {
			getListProducts({ category_id });
		}
	}, [category_id]);

	const { option, tncCollapse } = getProductDetails({
		user_purchase_limit,
		tncArray,
		redeem_steps,
	});

	return (
		<>
			<Header cartCount={cartCount} fromCartpage />
			<div className={styles.container}>
				<Breadcrumb>
					<Breadcrumb.Item
						label={(
							<span
								onClick={() => push(`/saas/cogo-store/category/${category_id}?isCategory=true`)}
								className={styles.breadcrum_label}
								role="presentation"
							>
								{display_name}
							</span>
						)}
					/>
					<Breadcrumb.Item label={<span>{name}</span>} />
				</Breadcrumb>

				<ProductInfo
					productCodeId={product_code_id}
					option={option}
					loading={loading}
					createCogostoreCartItem={createCogostoreCartItem}
					productCode={product_code}
					cogopoints={cogopoints}
					addToCard={addToCard}
				/>

				<div className={styles.tnc}>
					<Collapse
						panels={tncCollapse}
						activeKey={CollapseValue}
						setActive={setCollapseValue}
						type="text"
					/>
				</div>

				<div className={styles.voucher}>
					<div className={styles.label}>
						{t('cogoStore:product_details_vouchers')}
					</div>
					<div className={styles.like_vouchers}>
						{list.map((item) => (
							<StoreCard key={item?.id} item={item} isProductPage />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductDetails;
