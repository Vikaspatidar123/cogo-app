import { Radio, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from '../styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const List = ({
	rates = [], checked = '', checkboxHandler,
}) => {
	const { t } = useTranslation('dutiesTaxesCalculator');

	return rates.map((item) => (
		<React.Fragment key={item?.card}>
			<div className={cl`${styles.row} ${styles.without_mobile}`} key={item?.card}>
				<div>
					<Radio
						label=""
						checked={checked === item?.card}
						onChange={() => checkboxHandler(item)}
					/>
				</div>
				<div className={`${styles.col} ${styles.icon}`}>
					{/* image url is comming from Backend */}
					{item?.shipping_line?.logo_url || item?.airline?.logo_url ? (
						<img
							className={styles.img_icon}
							src={item?.shipping_line?.logo_url || item?.airline?.logo_url}
							alt={t('dutiesTaxesCalculator:freight_modal_logo')}
						/>
					) : (
						<div className={styles.img_alt}>
							<i>
								(
								{t('dutiesTaxesCalculator:freight_modal_logo')}
								)
							</i>
						</div>
					)}
				</div>
				<div className={`${styles.col} ${styles.name}`}>
					{item?.shipping_line?.business_name || item?.airline?.business_name}
				</div>
				<div className={`${styles.col} ${styles.price}`}>
					{formatAmount({
						amount   : item?.total_price,
						currency : item?.total_price_currency,
						options  : {
							notation : 'standard',
							style    : 'currency',
						},
					})}
				</div>
			</div>
			<div
				key={item?.card}
				className={cl`${checked === item?.card && styles.selected_row} 
				${styles.col} ${styles.with_mobile}`}
			>
				<div>
					<div className={`${styles.col} ${styles.icon}`}>
						<img
							className={styles.img_icon}
							src={item?.shipping_line?.logo_url || item?.airline?.logo_url}
							alt={t('dutiesTaxesCalculator:freight_modal_logo')}
						/>
					</div>
					<div className={`${styles.col} ${styles.name}`}>
						{item?.shipping_line?.business_name || item?.airline?.business_name}
					</div>
				</div>
				<div className={styles.rate_section}>
					<div className={`${styles.col} ${styles.price}`}>
						{formatAmount({
							amount   : item?.total_price,
							currency : item?.total_price_currency,
							options  : {
								notation : 'standard',
								style    : 'currency',
							},
						})}
					</div>
					<div className={styles.price}>
						<Radio
							label=""
							className="primary lg"
							checked={checked === item?.card}
							onChange={() => checkboxHandler(item)}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	));
};

export default List;
