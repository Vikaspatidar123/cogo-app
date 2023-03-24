import { Button } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import getDetailsFeatures from '../../helpers/getDetailsPrice';

import Features from './Features';
import PriceBreakup from './PriceBreakup';
import RatePerContainer from './RatePerContainer';
import ShippingCompany from './ShippingCompany';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function RateCard({ typeName, ratesBreakdown = {}, detail = {} }) {
	const { shipping_line, airline, service_type } = ratesBreakdown || {};
	const [showPrice, setShowPrice] = useState(false);
	const features = getDetailsFeatures({ ratesBreakdown, detail });
	const { scope } = useSelector(({ general }) => ({
		scope: general.scope,
	}));

	let noRatesCount = 0;

	const { service_rates } = ratesBreakdown || {};
	const services_ids = Object.keys(service_rates || {});
	(services_ids || []).forEach((key) => {
		const { is_rate_available } = service_rates[key] || {};
		if (!is_rate_available) noRatesCount += 1;
	});

	const noRatesText =		scope === 'app' ? 'Fetching rates for ' : 'No rates available for';

	return (
		<div className={styles.container}>
			<ShippingCompany
				typeName={typeName}
				shippingLine={shipping_line || airline}
				ratesBreakdown={ratesBreakdown}
				serviceType={service_type || ''}
			/>
			<div className={styles.info_wrapper}>
				<Features feature={features} />
				<RatePerContainer
					rates={ratesBreakdown}
					setShowPrice={setShowPrice}
					showPrice={showPrice}
				/>
			</div>
			<div className={showPrice ? styles.footer_price_shown : styles.footer}>
				<div className={styles.rates_price}>
					{noRatesCount ? (
						<>
							{noRatesText}
							{' '}
							{noRatesCount}
							{' '}
							additional services
						</>
					) : null}
				</div>

				<Button
					className="primary  sm text button-text-black"
					onClick={(e) => {
						e.stopPropagation();
						setShowPrice(!showPrice);
					}}
				>
					{showPrice ? 'Hide' : 'View'}
					{' '}
					Details
					<IcMArrowDown />
				</Button>
			</div>
			{showPrice && <PriceBreakup details={detail} data={ratesBreakdown} />}
		</div>
	);
}

export default RateCard;
