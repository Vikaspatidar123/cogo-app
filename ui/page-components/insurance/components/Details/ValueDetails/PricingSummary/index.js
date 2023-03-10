import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

// import {
// 	StyledRow2,
// 	StyledCol2,
// 	Rowed,
// 	Column,
// 	Row2,
// 	Rowed2,
// 	StyledLoading,
// 	LoaderWrapper,
// 	Div,
// } from '../style.js';

// import { InfoIcon, StyledCol, TooltipContainer } from './styles.js';
import styles from './styles.module.css';

import shortFormatNumber from '@/ui/commons/utils/getShortFromatNumber';

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
		<div className={styles.row_2}>
			<div className={styles.column}>
				<div className={styles.styled_row2}>
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
								<div>{shortFormatNumber(netPremium, 'INR')}</div>
							</div>
							<div className={styles.rowed}>
								<div>Platform Charges</div>
								<div>
									<hr className={styles.line} />
								</div>
								<div>{shortFormatNumber(platformCharges, 'INR')}</div>
							</div>
							<div className={styles.rowed_2}>
								<div>Convenience Fee</div>
								<div>
									<hr className={styles.line} />
								</div>
								<div>{shortFormatNumber(convenienceFee, 'INR')}</div>
							</div>
							<div className={styles.rowed}>
								<div>Amount Payable</div>
								<div>
									<hr className={styles.line} />
								</div>
								<div>{shortFormatNumber(totalApplicableCharges, 'INR')}</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default PricingSummary;
