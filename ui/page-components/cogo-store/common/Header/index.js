import { Badge, cl, Placeholder } from '@cogoport/components';
import { IcMClock, IcCCogoCoin } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import useGetCogostoreCartItems from '../../hooks/useGetCogostoreCartItems';

import styles from './styles.module.css';

import { useRouter, Image } from '@/packages/next';
import useGetCogopoints from '@/ui/commons/hooks/useGetCogoPoints';

function Header({
	showOrderList = true,
	cartCount = {},
	fromCartpage = false,
}) {
	const { t } = useTranslation(['cogoStore']);
	const { push } = useRouter();
	const { data } = useGetCogostoreCartItems({ only_count_required: true });
	const { cart_item_count = 0 } = data || {};
	const { cart_item_count: cartItemCount = 0 } = cartCount || {};

	const newCartItemCount = fromCartpage ? cartItemCount : cart_item_count;
	const { loading = false, stats } = useGetCogopoints();
	const { cogostore_redeemable = 0 } = stats || {};

	const backHandler = () => {
		push('/saas/cogo-store');
	};

	return (
		<div className={cl`${styles.container} ${styles.flex_box}`}>
			<div className={cl`${styles.col} ${styles.flex_box}`}>
				<Image
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/CogoBag.png"
					alt={t('cogoStore:orderHistory_card_image_alt')}
					width={26}
					height={26}
				/>

				<span
					className={cl`${styles.title} ${styles.cursor_marker}`}
					role="presentation"
					onClick={backHandler}
				>
					{t('cogoStore:cogo_title')}
				</span>
			</div>
			<div className={styles.flex_box}>
				<div className={styles.cogopoints}>
					<div>
						<IcCCogoCoin width="15px" height="18px" className={styles.coin} />
					</div>
					<div className={styles.label}>
						{t('cogoStore:cogostore_redeemable')}
					</div>
					<span className={styles.points}>
						{loading ? (
							<Placeholder height="15px" width="20px" />
						) : (
							cogostore_redeemable || 0
						)}
					</span>
				</div>
				{showOrderList && (
					<div
						className={cl`${styles.flex_box} ${styles.order} ${styles.cursor_marker}`}
						onClick={() => push('/saas/cogo-store/order')}
						role="presentation"
					>
						<IcMClock className={styles.clock_icon} width={18} height={18} />
						<span className={styles.text}>{t('cogoStore:order_History')}</span>
					</div>
				)}
				<div
					onClick={() => push('/saas/cogo-store/cart')}
					role="presentation"
					className={cl`${styles.flex_box} ${styles.cursor_marker}`}
				>
					<Badge
						placement="right"
						color="#fede00"
						size="md"
						text={newCartItemCount || ''}
					>
						<img
							alt=""
							className={styles.cart_icon}
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Cart-Outline (1).png"
						/>
					</Badge>
					<span className={styles.text}>{t('cogoStore:My_cart')}</span>
				</div>
			</div>
		</div>
	);
}

export default Header;
