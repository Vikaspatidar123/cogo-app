import { IcMEdit, IcMFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Create from './Create';
import styles from './styles.module.css';

function NotifyParty({
	tradePartnerData = {},
	listShipmentTradePartners = () => {},
}) {
	const [showNotifyParty, setShowNotifyParty] = useState(
		tradePartnerData.notify_parties_detail?.length > 0,
	);

	const notifyParty = [];
	if (showNotifyParty) {
		(tradePartnerData.notify_parties_detail || []).forEach((item) => notifyParty.push(item?.trade_party_type));
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Notifying Party
				<IcMEdit
					onClick={() => setShowNotifyParty(false)}
					style={{ cursor: 'pointer' }}
				/>
			</div>

			{showNotifyParty ? (
				<div className={styles.list}>
					{notifyParty.map((item) => (
						<div className={styles.detail}>
							<IcMFtick
								fill="green"
								height="15px"
								width="15px"
								sytle={{ margin: '4px 8px 0 0' }}
							/>
							{item === 'self' ? 'Booking Party' : startCase(item)}
						</div>
					))}
				</div>
			) : (
				<Create
					tradePartnerData={tradePartnerData}
					listShipmentTradePartners={listShipmentTradePartners}
				/>
			)}
		</div>
	);
}

export default NotifyParty;
