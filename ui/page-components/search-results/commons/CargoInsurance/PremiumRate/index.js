import { Tooltip, cl } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

const tooltipContent = () => (
	<div className={styles.tool_tip_container}>
		<div>Inclusive of Taxes</div>
	</div>
);

function PremiumRate(props) {
	const { rateData = {} } = props;

	const {
		convenienceFee = 0,
		platformCharges = 0,
		netPremium = 0,
		totalApplicableCharges = 0,
	} = rateData || {};

	return (
		<div>
			<div className={styles.rate}>
				<div className={styles.flex}>
					Premium:
					<Tooltip theme="light" placement="top" content={tooltipContent()}>
						<sup>
							<IcMInfo />
						</sup>
					</Tooltip>
				</div>

				<div>
					{formatAmount({
						amount   : netPremium,
						currency : GLOBAL_CONSTANTS.currency_code.INR,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>

			<div className={styles.rate}>
				<div>Platform Charges:</div>
				<div>
					{formatAmount({
						amount   : platformCharges,
						currency : GLOBAL_CONSTANTS.currency_code.INR,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>

			<div className={cl`${styles.rate} ${styles.final}`}>
				<div>Convenience Fee:</div>
				<div>
					{formatAmount({
						amount   : convenienceFee,
						currency : GLOBAL_CONSTANTS.currency_code.INR,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>

			<div className={cl`${styles.rate} ${styles.final}`}>
				<div className={styles.red}>Amount Payable:</div>
				<div className={styles.red}>
					{formatAmount({
						amount   : totalApplicableCharges,
						currency : GLOBAL_CONSTANTS.currency_code.INR,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
		</div>
	);
}
export default PremiumRate;
