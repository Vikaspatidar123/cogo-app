import { Radio } from '@cogoport/components';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';

function CogoAssuredScheduleItem({ item, selected, selectAssuredSchedule }) {
	const isDiscounted = item.freight_price_discounted - item.freight_price !== 0;

	const getPrice = (rate) => formatAmount({
		amount   : rate,
		currency : item.freight_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			minimumFractionDigits : 0,
			maximumFractionDigits : 0,
		},
	});

	const onSelect = () => {
		selectAssuredSchedule(item.validity_id);
	};

	return (
		<div role="presentation" className={styles.container} onClick={onSelect}>
			<Radio checked={selected === item.validity_id} />

			<div className={styles.main}>
				<div className={styles.label}>
					{`${formatDate({
						date       : item.validity_start,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})} to ${formatDate({
						date       : item.validity_end,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}`}
				</div>

				<div className={styles.price}>
					{isDiscounted && (
						<div className={styles.cancelled}>{getPrice(item.freight_price)}</div>
					)}
					{getPrice(item.freight_price_discounted)}
				</div>
			</div>
		</div>
	);
}

export default CogoAssuredScheduleItem;
