import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { shortFormatNumber } from '@/ui/page-components/transactionHistory/utils/getShortFormatNumber';

function DutiesTaxesModal({ tradeEngineResp }) {
	const {
		lineItem = [],
		resultCurrency = 'INR',
		totalDutiesAndTaxes = 0,
		totalLandedCost = 0,
		freightCharges = 0,
		consignmentValue = 0,
		additionalChargesList = {},
		modeOfTransport = '',
		incoterm = '',
	} = tradeEngineResp || {};
	const { incotermCharges: incotermArr = [] } = additionalChargesList || {};

	const calculateTotalCharge = (arr) => {
		const amount = (arr || []).reduce((acc, curr) => +acc + +curr.value, 0);
		return amount;
	};
	const tooltipContent = () => (
		<div className={styles.tooltip_container}>
			<div className={styles.heading}>Breakdown of Total Landed Cost</div>
			<div className={styles.row}>
				<div>Freight Charges</div>
				<div>{shortFormatNumber(freightCharges, resultCurrency, true)}</div>
			</div>
			<div className={styles.row}>
				<div>Consignment Value</div>
				<div>{shortFormatNumber(consignmentValue, resultCurrency, true)}</div>
			</div>
			<div className={styles.row}>
				<div>Applicable Charges</div>
				<div>
					{shortFormatNumber(calculateTotalCharge(incotermArr), resultCurrency, true)}
				</div>
			</div>
			<div className={styles.row}>
				<div>Total Duties and Taxes</div>
				<div>{shortFormatNumber(totalDutiesAndTaxes, resultCurrency, true)}</div>
			</div>
		</div>
	);
	return (
		<>
			<div className={styles.div}>
				<div className={`${styles.styled_tag} ${styles.incoterm}`}>{incoterm}</div>
				<div className={`${styles.styled_tag} ${styles.mode}`}>{modeOfTransport}</div>
			</div>
			{(lineItem || []).map(({ landedCost = {}, hsNumber = '' }) => (
				<div className={styles.section} key={hsNumber}>
					{(landedCost?.[0]?.taxSet || []).map(
						({ groupName = '', taxSetResponse = [] }) => (
							<div key={groupName} className={styles.charges}>
								<div className={styles.heading}>{groupName}</div>
								{(taxSetResponse || []).map(({ name = '', value = 0 }) => (
									<div className={styles.row} key={name}>
										<div>{name}</div>
										<div>{shortFormatNumber(value, resultCurrency, true)}</div>
									</div>
								))}
								<div className={styles.dashed_line} />
								<div className={`${styles.Row} ${styles.totoal}`}>
									<div>Total</div>
									<div>
										{shortFormatNumber(
											calculateTotalCharge(taxSetResponse),
											resultCurrency,
											true,
										)}
									</div>
								</div>
							</div>
						),
					)}
				</div>
			))}
			<div className={`${styles.row} ${styles.finalTotal} ${styles.dutiesTotal}`}>
				<div>Total Duties and Tax</div>
				<div>{shortFormatNumber(totalDutiesAndTaxes, resultCurrency, true)}</div>
			</div>
			<div className={`${styles.dashed_line} ${styles.total}`} />
			<div className={`${styles.row} ${styles.finalTotal}`}>
				<div className={styles.flex}>
					<div>Total Landed Cost</div>
					<div>
						<Tooltip
							content={tooltipContent()}
							interactive
						>
							<div className={styles.icon_container}>
								<IcMInfo width={14} height={14} />
							</div>
						</Tooltip>
					</div>
				</div>
				<div>{shortFormatNumber(totalLandedCost, resultCurrency, true)}</div>
			</div>
		</>
	);
}
export default DutiesTaxesModal;
