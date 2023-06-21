import { Radio, cl } from '@cogoport/components';

import styles from '../styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const List = ({
	rates = [], checked = '', checkboxHandler,
}) => rates.map((item) => (
	<>
		<div className={cl`${styles.row} ${styles.without_mobile}`} key={item?.card}>
			<div>
				<Radio
					label=""
					className="primary lg"
					checked={checked === item?.card}
					onChange={() => checkboxHandler(item)}
				/>
			</div>
			<div className={`${styles.col} ${styles.icon}`}>
				{item?.shipping_line?.logo_url || item?.airline?.logo_url ? (
					<img
						className={styles.img_icon}
						src={item?.shipping_line?.logo_url || item?.airline?.logo_url}
						alt="logo"
					/>
				) : (
					<div className={styles.img_alt}>
						<i>(logo)</i>
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
						alt="logo"
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
	</>
));

export default List;
