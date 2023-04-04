import { IcCCogoCoin, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatAmount from '@/ui/commons/utils/formatAmount';

function ViewCogoPoints({ cogopoint_data, setEditPoints, editPoints }) {
	const cogopoints = cogopoint_data.redeemed_cogopoints?.cogopoints || 0;
	const geo = getGeoConstants();

	if (editPoints) {
		return null;
	}

	return (
		<div className={styles.container}>
			<IcCCogoCoin height={18} width={18} />
			<div className={styles.balance}>
				CogoPoints Applied
				<div className={styles.amount}>{cogopoints.toLocaleString()}</div>
			</div>
			<div className={styles.conversion}>
				i.e.
				{' '}
				{formatAmount({
					amount:
						cogopoints
						* (cogopoint_data.max_redeemable_cogopoints?.cogopoints_unit_rate
							|| 0),
					currency : geo.country.currency.code,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 0,
					},
				})}
			</div>
			<div
				className={styles.edit_container}
				role="presentation"
				onClick={() => setEditPoints(true)}
			>
				<IcMEdit width={15} height={15} className="icon" />
			</div>
		</div>
	);
}

export default ViewCogoPoints;
