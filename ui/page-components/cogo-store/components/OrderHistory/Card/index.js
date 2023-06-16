import { Button, cl } from '@cogoport/components';
import {
	IcCCogoCoin,
	IcCFcrossInCircle,
	IcCFtick,
	IcMEyeopen,
	IcMShare,
} from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getOrderListMapping from '../../../utils/getOrderListMapping';

import styles from './styles.module.css';

function Card({ data, setModalInfo }) {
	const { t } = useTranslation(['cogoStore']);
	const MAPPING = getOrderListMapping({ t });
	const { order_items = [] } = data || {};

	const renderValue = (key, value) => {
		if (key === 'order_no') return value;
		if (key === 'created_at') return format(value, 'dd LLL yyyy');
		return (
			<>
				<IcCCogoCoin height={15} width={20} />
				{value}
			</>
		);
	};
	return (
		<div className={styles.container}>
			<div
				className={cl`${styles.section} ${styles.flex_box} ${styles.header}`}
			>
				{MAPPING.map(({ title, key }) => (
					<div key={key} className={cl`${styles.col} ${styles?.[key]}`}>
						<div className={styles.sub_text}>{title}</div>
						<div className={styles.text}>{renderValue(key, data?.[key])}</div>
					</div>
				))}
			</div>

			{order_items?.map((value) => {
				const {
					id = '',
					cart_item = {},
					status = '',
					order_item_addition_data = {},
				} = value || {};
				return (
					<div
						key={id}
						className={cl`${styles.section} ${styles.flex_box}
				${order_items.length > 1 ? styles.border_btm : ''}`}
					>
						<div className={`cl ${styles.col} ${styles.img_container}`}>
							<img
								alt={t('cogoStore:orderHistory_card_image_alt')}
								src={cart_item?.product?.product_code?.logo_urls?.[0]}
								className={styles.logo}
							/>
						</div>

						<div className={cl`${styles.col} ${styles.info}`}>
							<div className={cl`${styles.text} ${styles.info_heading}`}>
								{cart_item?.product?.product_code?.name}
							</div>
							<div className={cl`${styles.sub_text} ${styles.info_subheading}`}>
								{cart_item?.product?.product_code?.brand?.name}
							</div>
						</div>

						<div className={cl`${styles.col} ${styles.details}`}>
							<span>
								{t('cogoStore:cogostore_components_order_history_quantity')}
							</span>
							<span className={styles.gap}>{cart_item?.quantity}</span>
						</div>

						<div className={cl`${styles.col} ${styles.details}`}>
							<IcCCogoCoin height={15} width={25} />
							<span>{cart_item?.cogopoints}</span>
						</div>

						<div className={cl`${styles.col} ${styles.details}`}>
							{status === 'success' ? (
								<IcCFtick height={25} width={20} />
							) : (
								<IcCFcrossInCircle height={25} width={20} />
							)}
							<span className={styles.gap}>{startCase(status)}</span>
						</div>
						<div className={cl`${styles.col}  ${styles.cta_container}`}>
							{status === 'success' && (
								<>
									<div
										className={cl` ${styles.flex_box} ${styles.share_and_view}`}
									>
										<Button
											themeType="secondary"
											onClick={() => setModalInfo({
												isView: false,
												show: true,
												voucherData: [],
												orderItemId: id,
											})}
										>
											{t('cogoStore:order_history_card_share')}
										</Button>

										<Button
											onClick={() => setModalInfo({
												isView: true,
												show: true,
												voucherData: order_item_addition_data?.PullVouchers,
												orderItemId: id,
											})}
										>
											{t('cogoStore:view_details')}
										</Button>
									</div>
									<div
										className={cl` ${styles.flex_box} ${styles.share_and_mobile_view}`}
									>
										<div
											className={styles.view_details}
											role="presentation"
											onClick={() => setModalInfo({
												isView: true,
												show: true,
												voucherData: order_item_addition_data?.PullVouchers,
												orderItemId: id,
											})}
										>
											<IcMEyeopen width={20} height={20} />
										</div>
										<div
											className={styles.view_details}
											role="presentation"
											onClick={() => setModalInfo({
												isView: false,
												show: true,
												voucherData: [],
												orderItemId: id,
											})}
										>
											<IcMShare width={20} height={20} />
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Card;
