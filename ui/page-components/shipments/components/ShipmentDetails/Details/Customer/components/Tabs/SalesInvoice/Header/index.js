import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect } from 'react';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import handleTimer from '@/ui/page-components/shipments/utils/handleTimer';

function Header({ invoiceData = {} }) {
	const {
		net_total_price_discounted = 0,
		net_total_price_currency,
		invoice_trigger_date,
	} = invoiceData || {};

	const timerRef = useRef(null);
	let time = null;
	useEffect(() => {
		const interval = setInterval(() => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
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
		<div className={styles.container}>
			<div className={`${styles.flex_row} ${showTimer ? styles.active : styles.inactive}`}>
				<div className={styles.icon_wrapper}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-over-due.svg"
						alt="timer"
					/>
				</div>

				<p className={styles.trigger_time} id="proforma_trigger">
					<span id="timer" ref={timerRef} />
					<span style={{ fontWeight: 400, marginLeft: '4px' }}>
						(Until Profoma trigger)
					</span>
				</p>
			</div>

			<div className={styles.total_value}>
				<p className={styles.total_shipment_title}>Total Shipment Value - </p>

				<span className={styles.shipment_value}>
					{formatAmount({
						amount   : net_total_price_discounted,
						currency : net_total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</span>
			</div>
		</div>
	);
}

export default Header;
