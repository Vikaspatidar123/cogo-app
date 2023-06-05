import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function PricingSummary({ ratesResponse = {}, formDetails = {}, ratesLoading = false }) {
	const {
		convenienceFee = 0,
		platformCharges = 0,
		netPremium = 0,
		totalApplicableCharges = 0,
	} = ratesResponse || formDetails || {};

	const tooltipContent = () => (
		<div className={styles.tooltip_container}>
			<div className="row">
				Inclusive of Taxes
			</div>
		</div>
	);

	return (
		<div className={styles.column}>
			{ratesLoading && (
				<div className={styles.loader_wrapper}>
					<div className={styles.loading_text}>Please wait while we fetch Details!!!!!!</div>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
						alt=""
						className={styles.image}
					/>
				</div>
			)}
			{!ratesLoading && (
				<div className={styles.column_2}>
					<div className={styles.rowed}>
						<div className={styles.styled_col}>
							Premium
							<Tooltip theme="light" placement="top" content={tooltipContent()}>
								<div>
									<IcMInfo className={styles.info_icon} />
								</div>
							</Tooltip>
						</div>
						<div>
							<hr className={styles.line} />
						</div>
						<div>
							{formatAmount({
								amount   : netPremium,
								currency : 'INR',
								options  : {
									notation : 'standard',
									style    : 'currency',
								},
							})}

						</div>
					</div>
					<div className={styles.rowed}>
						<div>Platform Charges</div>
						<div>
							<hr className={styles.line} />
						</div>
						<div>
							{formatAmount({
								amount   : platformCharges,
								currency : 'INR',
								options  : {
									notation : 'standard',
									style    : 'currency',
								},
							})}

						</div>
					</div>
					<div className={styles.rowed_2}>
						<div>Convenience Fee</div>
						<div>
							<hr className={styles.line} />
						</div>
						<div>
							{formatAmount({
								amount   : convenienceFee,
								currency : 'INR',
								options  : {
									notation : 'standard',
									style    : 'currency',
								},
							})}

						</div>
					</div>
					<div className={styles.rowed}>
						<div>Amount Payable</div>
						<div>
							<hr className={styles.line} />
						</div>
						<div>
							{formatAmount({
								amount   : totalApplicableCharges,
								currency : 'INR',
								options  : {
									notation : 'standard',
									style    : 'currency',
								},
							})}

						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default PricingSummary;
