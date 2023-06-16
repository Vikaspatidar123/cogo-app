import { Button, Select } from '@cogoport/components';
import { IcAAboutUs, IcCCogoCoin } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';

function ProductInfo({
	productCode = {},
	option = [],
	loading,
	createCogostoreCartItem,
	productCodeId,
	cogopoints,
	addToCard,
}) {
	const { push } = useRouter();
	const { t } = useTranslation(['cogoStore']);
	const [image, setImage] = useState('');
	const [productCount, setProductCount] = useState(1);
	const {
		name = '',
		description = '',
		brand = {},
		logo_urls = [],
	} = productCode || {};
	const { name: brand_name } = brand;

	return (
		<div className={styles.product_details}>
			<div className={styles.image_container}>
				<div className={styles.img}>
					{logo_urls.map((url) => (
						<img
							key={url}
							src={url}
							alt={t(
								'cogoStore:cogostore_components_product_details_productInfo_alt',
							)}
							height={80}
							width={80}
							onClick={() => setImage(url)}
							role="presentation"
							className={styles.each_img}
						/>
					))}
				</div>
				{!logo_urls && (
					<IcAAboutUs height={400} width="85%" className={styles.enlarge} />
				)}
				{logo_urls && (
					<img src={image || logo_urls[0]} alt="" className={styles.enlarge} />
				)}
			</div>

			<div className={styles.product_details_text}>
				<div className={styles.product_name}>{name}</div>
				<div className={styles.brand_name}>{brand_name}</div>
				<div className={styles.product_price}>
					<IcCCogoCoin width={20} height={20} />
					{' '}
					{cogopoints}
				</div>
				<div className={styles.product_tnc}>
					{t('cogoStore:product_details_tnc')}
				</div>
				<div>
					{option.length > 0 && (
						<div className={styles.quantity_add_to_cart}>
							{!addToCard ? (
								<>
									<div className={styles.select_fields}>
										<Select
											value={productCount}
											onChange={setProductCount}
											placeholder={t(
												'cogoStore:product_details_productInfo_select_placeholder',
											)}
											options={option}
											size="sm"
										/>
									</div>
									<Button
										onClick={() => {
											createCogostoreCartItem({
												product_code_id: productCodeId,
												quantity: productCount,
											});
										}}
										themeType="primary"
										disabled={loading}
										size="lg"
										className={styles.add_to_cart_button}
									>
										{t('cogoStore:product_details_add_to_cart')}
									</Button>
								</>
							) : (
								<Button
									type="submit"
									onClick={() => push('/saas/cogo-store/cart')}
									disabled={loading}
									className={styles.add_to_cart_button}
								>
									{t('cogoStore:product_details_go_to_cart')}
								</Button>
							)}
						</div>
					)}
					{option.length === 0 && (
						<div className={styles.out_of_stock}>Out of Stock</div>
					)}
				</div>
				<div className={styles.about_voucher}>
					{t('cogoStore:product_details_about_voucher')}
				</div>
				<div className={styles.about_voucher_text}>{description}</div>
			</div>
		</div>
	);
}
export default ProductInfo;
