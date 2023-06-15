import { cl } from '@cogoport/components';

import ServiceIcon from '../../../ServiceIcon';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function RateSummaryCostBreakdownRate({
	name,
	title,
	price,
	price_discounted,
	currency,
	otherDetails,
	is_rate_available,
	primaryService,
	service_type,
}) {
	const isDiscounted = price_discounted - price !== 0;

	const getPrice = (rate) => formatAmount({
		amount  : rate,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			minimumFractionDigits : 0,
			maximumFractionDigits : 0,
		},
	});

	const freightClass = name === primaryService ? 'bold' : '';

	const getOtherDetails = () => {
		if (!otherDetails) {
			return null;
		}
		return (
			<div className={styles.other_details}>
				(
				{otherDetails.replace(/_/g, ' ')}
				)
			</div>
		);
	};

	const rate_not_available_text = [
		'export_fcl_freight_local',
		'import_fcl_freight_local',
	].includes(name)
		? '*at actuals'
		: 'No Rates';

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<ServiceIcon service={service_type} />
				<div className={cl`${styles.title} ${freightClass}`}>
					{title}
					{getOtherDetails()}
				</div>
			</div>

			<div className={cl`${styles.price} ${freightClass}`}>
				{is_rate_available ? (
					<>
						{isDiscounted
						&& (
							<div className={styles.cancelled}>
								{getPrice(price)}
							</div>
						)}
						{getPrice(price_discounted)}
					</>
				) : (
					<div className={styles.comment}>
						{rate_not_available_text}
						<div className={`${styles.comment} ${styles.remove}`} />
						service will be removed
					</div>
				)}
			</div>
		</div>
	);
}

export default RateSummaryCostBreakdownRate;
