import { Button, cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import getDetailsFeatures from '../../helpers/getDetailsPrice';

import Features from './Features';
import PriceBreakup from './PriceBreakup';
import RatePerContainer from './RatePerContainer';
import ShippingCompany from './ShippingCompany';
import styles from './styles.module.css';

const RATE_INCREMENT = 1;

const titleDisplay = ({ rfqStatus, title }) => {
	const MARGIN_NAME_DISPLAY = {
		recommended : 'View Break-Up',
		created     : rfqStatus !== 'expired' ? 'Adjust Rates' : 'View Break-Up',
		spot_rates  : rfqStatus !== 'expired' ? 'Adjust Rates' : 'View Break-Up',
		negotiated_rates:
			rfqStatus !== 'expired' ? 'Adjust Rates' : 'View Break-Up',
	};
	return MARGIN_NAME_DISPLAY[title];
};

const ratesCount = ({ ratesBreakdown }) => {
	let noRatesCount = 0;
	const { service_rates } = ratesBreakdown || {};
	const servicesIds = Object.keys(service_rates || {});
	(servicesIds || []).forEach((key) => {
		const { is_rate_available } = service_rates[key] || {};
		if (!is_rate_available) {
			noRatesCount += RATE_INCREMENT;
		}
	});
	return noRatesCount;
};

function RateCard({
	typeName,
	ratesBreakdown,
	detail = {},
	setShowEditMarginModal = () => {},
	setShowNegotiate = () => {},
	negotiation_rank,
	title = '',
	card_state = '',
	source = '',
	negotiation_limit,
	rfqStatus,
}) {
	const {
		shipping_line,
		airline,
		service_type = '',
		card = {},
	} = ratesBreakdown || {};

	const [showPrice, setShowPrice] = useState(false);

	const features = getDetailsFeatures({ ratesBreakdown, detail });
	const noRatesCount = ratesCount({ ratesBreakdown });

	return (
		<div className={styles.container}>
			<ShippingCompany
				typeName={typeName}
				shippingLine={shipping_line || airline}
				ratesBreakdown={ratesBreakdown}
				serviceType={service_type || ''}
				card_state={card_state}
			/>

			<div className={styles.info_wrapper}>
				<Features feature={features} />
				<RatePerContainer
					rates={ratesBreakdown}
					setShowPrice={setShowPrice}
					showPrice={showPrice}
				/>
			</div>

			<div className={cl`${styles.footer} ${showPrice ? styles.footer_price_shown : ''}`}>
				<div className={styles.rates_price}>
					{noRatesCount ? (
						<>
							Fetching rates for
							{' '}
							{noRatesCount}
							{' '}
							additional services
						</>
					) : null}
				</div>
				{source !== 'app' ? (
					<div className={styles.button_container}>
						{negotiation_rank < negotiation_limit
							&& title === 'spot_rates' && rfqStatus !== 'expired' && (
								<Button
									size="sm"
									themeType="secondary"
									onClick={() => { setShowNegotiate({ card }); }}
									type="button"
								>
									Negotiate
								</Button>
						)}
						<Button
							size="sm"
							themeType="secondary"
							onClick={() => {
								setShowEditMarginModal({ ...ratesBreakdown, title });
							}}
							type="button"
						>
							{titleDisplay({ rfqStatus, title })}
						</Button>
					</div>
				)
					: (
						<Button
							themeType="linkUi"
							onClick={() => {
								setShowPrice((prev) => !prev);
							}}
						>
							{showPrice ? 'Hide' : 'View'}
							{' '}
							Details
							<IcMArrowDown />
						</Button>
					)}

			</div>
			{showPrice && <PriceBreakup details={detail} data={ratesBreakdown} />}
		</div>
	);
}

export default RateCard;
