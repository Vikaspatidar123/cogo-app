import { cl, Pill, Tooltip, Checkbox } from '@cogoport/components';
import { IcMScreenShare } from '@cogoport/icons-react';

import servicesConfiguration from '../../../../../configuration/serviceConfiguration';

import styles from './styles.module.css';

import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

function ServiceCharge({
	serviceProduct = {}, serviceData, isQuotaLeft, traderCheck,
	setTrackerCheck, loading = false,
}) {
	const { services = {}, currency = 'INR' } = serviceData || {};

	const getTooltipContent = (index) => (
		<div>
			<p className={styles.tooltip_header}>Product Name: </p>
			{serviceProduct[index + 1].map((name) => (
				<p>{name}</p>
			))}
		</div>
	);

	const traderTooltipContent = () => (
		<div style={{ fontSize: '12px' }}>
			{`Trading with new seller/buyer? Don't Worry! Check whether your trader is
			not blacklisted and save yourself from illegalities`}
		</div>
	);

	const getPrice = (name, quantity) => {
		const { price = 0, discount = 0 } = services?.[name] || {};
		const discountPrice = (+price * (100 - +discount)) / 100;

		const finalAmount = discountPrice * quantity;
		return shortFormatNumber(finalAmount, currency);
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Services</h3>

			<div>
				{servicesConfiguration.map((service, index) => {
					const { id, icon, displayName, name } = service || {};
					const quantity = serviceProduct?.[id]?.length;
					// eslint-disable-next-line react/jsx-no-useless-fragment
					if (quantity === 0) return <></>;

					return (
						<div className={cl`${styles.flex_box} ${styles.row}`}>
							<div className={cl`${styles.flex_box} ${styles.info}`}>
								{icon}

								<Tooltip placement="right" content={getTooltipContent(index)}>
									<div className={styles.text}>{displayName}</div>
								</Tooltip>

								{!isQuotaLeft && services[name]?.discount > 0 && (
									<Pill color="blue">
										{`${services[name]?.discount} %off`}
									</Pill>
								)}
							</div>
							<div className={styles.quantity}>
								Qty:
								{quantity}
							</div>
							{!isQuotaLeft && (
								<div>
									<div className="price">{getPrice(name, quantity)}</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
			<div className={styles.trader_check_container}>
				<div className={styles.heading}>People also buy:</div>

				<div className={cl`${styles.flex_box} ${styles.trader_row}`}>

					<Checkbox
						checked={traderCheck}
						onChange={() => setTrackerCheck((prev) => !prev)}
						disabled={loading}
					/>

					<div className={styles.screen}>
						<IcMScreenShare className="icon" width={25} height={25} />
						<Tooltip placement="top" content={traderTooltipContent()} maxWidth="350px">
							<div className={styles.text}>Trader Eligibility Check</div>
						</Tooltip>
					</div>

					{!isQuotaLeft && (
						<div className={styles.price}>
							<Pill color="yellow" size="xl">{getPrice('buyer_eligibility_check', 1)}</Pill>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ServiceCharge;
