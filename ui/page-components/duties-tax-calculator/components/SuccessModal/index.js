/* eslint-disable max-len */
import { ToolTip, cl } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import Button from '../../common/Button';
import { SuccessGif } from '../../configuration/icon-configuration';
import { shortFormatNumber } from '../../utils/getShortFormatNumber';

// import {
// 	Container,
// 	IconContainer,
// 	HeaderContainer,
// 	Section,
// 	Title,
// 	Line,
// 	Row,
// 	Heading,
// 	DashedLine,
// 	BtnContainer,
// 	IconImage,
// 	TooltipContainer,
// } from './styles';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function SuccessModal({ tradeEngineResp, isMobile = false }) {
	const {
		lineItem = [],
		resultCurrency = 'INR',
		totalDutiesAndTaxes = 0,
		totalLandedCost = 0,
		freightCharges = 0,
		consignmentValue = 0,
		additionalChargesList = {},
	} = tradeEngineResp || {};

	const { query } = useRouter();
	const { incotermCharges: incotermArr = [] } = additionalChargesList || {};
	const { org_id = '', branch_id = '', account_type = '' } = query || {};

	const redirectToTax = () => {
		const redirectUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/premium-services/duties-taxes-calculator`;

		window.open(redirectUrl, '_self');
	};

	const calculateTotalCharge = (arr) => {
		const amount = arr.reduce((acc, curr) => +acc + +curr.value, 0);
		return amount;
	};

	const tooltipContent = () => (
		<div className={styles.tooltip_container}>
			<div className={styles.tooltip_heading}>Breakdown of Total Landed Cost</div>
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
		<div className={styles.container}>
			<div className={styles.icon_container_div}>
				<img src={SuccessGif} alt="cogo" className={styles.icon_img} />
			</div>
			<div className={styles.header_container}>
				<div className={styles.title}>Congratulations!</div>
				<div className={styles.subTitle}>
					Successfully calculated Duties and Taxes.
					<br />
					{' '}
					Below given are the results
				</div>
			</div>
			{(lineItem || []).map(({ landedCost = {}, hsNumber = '' }) => (
				<div key={hsNumber}>
					<div className={styles.section_heading}>
						<div className={styles.title_div}>Duties & Taxes</div>
						<div className={styles.line} />
					</div>
					{(landedCost?.[0]?.taxSet || []).map(
						({ groupName = '', taxSetResponse = [] }) => (
							<div key={groupName} className={styles.charges}>
								<div className={styles.heading_div}>{groupName}</div>
								{(taxSetResponse || []).map(({ name = '', value = 0 }) => (
									<div className={styles.row} key={name}>
										<div>{name}</div>
										<div>{shortFormatNumber(value, resultCurrency, true)}</div>
									</div>
								))}
								<div className={styles.dashed_line} />
								<div className={cl`${styles.row} ${styles.total}`}>
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
			<div className={cl`${styles.row} ${styles.finalTotal} ${styles.dutiesTotal}`}>
				<div>Total Duties and Tax</div>
				<div>{shortFormatNumber(totalDutiesAndTaxes, resultCurrency, !isMobile)}</div>
			</div>
			<div className={cl`{styles.dashed_line}${styles.dashed_total}`} />
			<div className={cl`${styles.row} ${styles.finalTotal}`}>
				<div className={styles.flex}>
					<div>Total Landed Cost</div>
					<ToolTip
						theme="light-border"
						placement="top"
						content={tooltipContent()}
						interactive
					>
						<div className={styles.iconContainer}>
							<IcMInfo width={14} height={14} />
						</div>
					</ToolTip>
				</div>
				<div>{shortFormatNumber(totalLandedCost, resultCurrency, !isMobile)}</div>
			</div>

			<div className={styles.btn_container}>
				<Button size="md" onClick={redirectToTax}>
					Calculate More
				</Button>
			</div>
		</div>
	);
}

export default SuccessModal;
