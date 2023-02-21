import { Radio } from '@cogoport/components';

import { shortFormatNumber } from '../../../../../utils/getShortFormatNumber';
import styles from '../styles.module.css';

const List = ({
	rates = [], isMobile = false, checked = '', checkboxHandler,
}) => rates.map((item) => (!isMobile ? (
	<div className={styles.row} key={item?.card}>
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
			{shortFormatNumber(item?.total_price, item?.total_price_currency, true)}
		</div>
	</div>
) : (
	<div key={item?.card} className={`${checked === item?.card && styles.selected_row} ${styles.col}`}>
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
				{shortFormatNumber(item?.total_price, item?.total_price_currency, true)}
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
)));

export default List;
