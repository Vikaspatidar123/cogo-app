// import handleTimer from '@cogo/bookings/utils/handleTimer';
// import formatAmount from '@cogo/globalization/utils/formatAmount';
// import { isEmpty } from '@cogoport/front/utils';
import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect } from 'react';

// import {
// 	Container,
// 	TotalShipmenTitle,
// 	ShipmentValue,
// 	TotalValue,
// 	TriggerTime,
// 	FlexRow,
// 	IconWrapper,
// } from './styles';

function Header({ invoiceData = {} }) {
	const {
		net_total_price_discounted = 0,
		net_total_price_currency,
		// invoice_tat_show,
		invoice_trigger_date,
	} = invoiceData || {};

	const timerRef = useRef(null);
	let time = null;
	useEffect(() => {
		const interval = setInterval(() => {
			time = handleTimer(invoice_trigger_date);

			if (time) {
				timerRef.current.innerText = time;
			}
		}, 1000);

		if (!invoice_trigger_date) {
			return () => clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, []);

	const showTimer = !isEmpty(invoice_trigger_date);

	return (
		<Container>
			<FlexRow className={showTimer ? 'active' : 'inactive'}>
				<IconWrapper>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-over-due.svg"
						alt="timer"
					/>
				</IconWrapper>

				<TriggerTime id="proforma_trigger">
					<span id="timer" ref={timerRef} />
					<span style={{ fontWeight: 400, marginLeft: '4px' }}>
						(Until Profoma trigger)
					</span>
				</TriggerTime>
			</FlexRow>

			<TotalValue>
				<TotalShipmenTitle>Total Shipment Value - </TotalShipmenTitle>

				<ShipmentValue>
					{formatAmount({
						amount   : net_total_price_discounted,
						currency : net_total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</ShipmentValue>
			</TotalValue>
		</Container>
	);
}

export default Header;
