import { Tooltip, cl } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

const getFormattedAmount = (amount) => formatAmount({
	amount,
	currency : GLOBAL_CONSTANTS.currency_code.INR,
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},
});

function TooltipContent() {
	return (
		<div className={styles.tool_tip_container}>
			<div>Exclusive of Taxes</div>
		</div>
	);
}

function PremiumRate(props) {
	const { rateData = {}, error } = props;

	const { totalCharges = 0, serviceChargeList = [] } = rateData || {};
	if (error) {
		return (
			<div className={styles.red}>
				*
				{' '}
				{error}
			</div>
		);
	}
	if (isEmpty(rateData)) {
		return null;
	}
	return (
		<div>
			{serviceChargeList.map((service) => {
				const { serviceName, totalCharges: serviceTotalCharge } = service;

				return (
					<div className={styles.rate} key={serviceName}>
						{startCase(serviceName)}
						{' '}
						:
						<div>{getFormattedAmount(serviceTotalCharge)}</div>
					</div>
				);
			})}

			<div className={cl`${styles.rate} ${styles.final}`}>
				<div className={styles.red}>
					Amount Payable:
					<Tooltip theme="light" placement="top" content={<TooltipContent />}>
						<sup>
							<IcMInfo />
						</sup>
					</Tooltip>
				</div>

				<div className={styles.red}>{getFormattedAmount(totalCharges)}</div>
			</div>
		</div>
	);
}

export default PremiumRate;
