import { Button } from '@cogoport/components';
import { IcCCogoCoin } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import CompleteOrderLoading from '../../common/CompleteOrderLoading';
import Header from '../../common/Header';
import useBookCogostoreCart from '../../hooks/useBookCogostoreCart';
import useGetCogostoreCartItems from '../../hooks/useGetCogostoreCartItems';
import useUpdateCogostoreCartItem from '../../hooks/useUpdateCogostoreCartItem';

import BillingAddress from './BillingAddress';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import styles from './styles.module.css';
import SuccessModal from './SuccessModal';

function Cart() {
	const { t } = useTranslation(['cogoStore']);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [productStock, setProductStock] = useState({});
	const [load, setLoad] = useState(true);
	const [selectAddressId, setSelectAddressId] = useState('');

	const { data, getCogostoreCartItems, loading } = useGetCogostoreCartItems({
		only_count_required: false,
	});

	const { loading: updateLoading, updateCogostoreCartItem } = useUpdateCogostoreCartItem({ getCogostoreCartItems });

	const {
		loading: confirmLoading,
		bookCogostoreCart,
		getOrderList,
	} = useBookCogostoreCart();

	const {
		cart_products = [],
		cart = {},
		cart_item_count = 0,
		user_cogostore_balance = 0,
	} = data || {};
	const { total_cogopoint = 0, id: cart_id = '' } = cart || {};

	const checkProductType = (cart_products || [])?.filter(
		(item) => item?.product_code?.product_type === 'physical',
	);

	const onConfirmOrder = async () => {
		const resp = await bookCogostoreCart({ id: cart_id, selectAddressId });
		return resp;
	};

	const disabledBtn = Object.values(productStock).includes(false)
		|| total_cogopoint > user_cogostore_balance
		|| confirmLoading
		|| updateLoading;

	const renderComponent = () => {
		if (!loading && cart_item_count === 0) {
			return (
				<div className={styles.empty_cart}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/undraw_empty_cart_co35.svg"
						alt={t('cogoStore:components_cart_image_alt_text')}
						height={500}
						width={500}
					/>
					<div>{t('cogoStore:cart_empty_container')}</div>
				</div>
			);
		}
		if (loading && load) {
			return <CompleteOrderLoading />;
		}
		return (
			<div className={styles.cart_order}>
				<div className={styles.left_div}>
					{checkProductType.length !== 0 && (
						<BillingAddress
							selectAddressId={selectAddressId}
							setSelectAddressId={setSelectAddressId}
						/>
					)}

					<div className={styles.contact_info}>
						<h2>
							{cart_products.length}
							{' '}
							{t('cogoStore:header_cart_items')}
						</h2>
						{cart_products.map((cartInfo) => (
							<CartItems
								key={cartInfo?.id}
								cartInfo={cartInfo}
								updateCogostoreCartItem={updateCogostoreCartItem}
								updateLoading={updateLoading}
								cart_id={cart_id}
								setLoad={setLoad}
								setProductStock={setProductStock}
							/>
						))}
					</div>
				</div>
				<div className={styles.order_summary}>
					<div className={styles.sticky}>
						<div className={styles.order_col}>
							<h2>{t('cogoStore:cart_order_summary')}</h2>
							<div className={styles.summary}>
								{cart_products.map((cartSummary) => (
									<OrderSummary
										key={cartSummary?.id}
										cartSummary={cartSummary}
									/>
								))}
							</div>

							<div className={styles.total_order}>
								<div className={styles.total_text}>
									{t('cogoStore:cart_total')}
								</div>
								<div className={styles.total_order_value}>
									<IcCCogoCoin width={25} height={25} />
									<div className={styles.order_price}>{total_cogopoint}</div>
								</div>
							</div>
						</div>

						<Button
							size="lg"
							themeType="primary"
							style={{
								width: '100%',
							}}
							onClick={() => setShowSuccessModal(true)}
							disabled={disabledBtn}
						>
							{total_cogopoint > user_cogostore_balance
								? t('cogoStore:cart_insufficient_balance')
								: t('cogoStore:cart_confirm_order')}
						</Button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className={styles.cart_page}>
			<Header cartCount={data} fromCartpage />
			{renderComponent()}
			<SuccessModal
				showSuccessModal={showSuccessModal}
				setShowSuccessModal={setShowSuccessModal}
				onConfirmOrder={onConfirmOrder}
				confirmLoading={confirmLoading}
				orderList={getOrderList}
				total_cogopoint={total_cogopoint}
			/>
		</div>
	);
}

export default Cart;
