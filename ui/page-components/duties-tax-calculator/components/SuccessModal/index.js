/* eslint-disable no-restricted-globals */
import { Tooltip, cl, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import { SuccessGif } from '../../configuration/icon-configuration';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import formatAmount from '@/ui/commons/utils/formatAmount';

const CHARGE_MAPPING = {
	freightCharges      : 'Freight Charges',
	consignmentValue    : 'Consignment Value',
	incotermAmmount     : 'Applicable Charges',
	totalDutiesAndTaxes : 'Total Duties and Taxes',
};

const calculateTotalCharge = (arr) => {
	const amount = arr.reduce((acc, curr) => +acc + +curr.value, 0);
	return amount;
};

function TooltipContent({ tradeEngineResp }) {
	const { resultCurrency, additionalChargesList } = tradeEngineResp || {};
	const { incotermCharges: incotermArr = [] } = additionalChargesList || {};

	const incotermAmmount = calculateTotalCharge(incotermArr);

	return (
		<div className={styles.tooltip_container}>
			<div className={styles.tooltip_heading}>Breakdown of Total Landed Cost</div>
			{Object.keys(CHARGE_MAPPING).map((charge) => {
				let chargeValue = tradeEngineResp?.[charge] || 0;
				if (charge === 'incotermAmmount') chargeValue = incotermAmmount;
				return (
					<div className={styles.row} key={charge}>
						<div>{CHARGE_MAPPING[charge]}</div>
						<div>
							{formatAmount({
								amount   : chargeValue || 0,
								currency : resultCurrency,
								options  : {
									notation : 'standard',
									style    : 'currency',
								},
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}

function SuccessModal({ tradeEngineResp }) {
	const {
		lineItem = [],
		resultCurrency = 'INR',
		totalDutiesAndTaxes = 0,
		totalLandedCost = 0,
	} = tradeEngineResp || {};

	const { query } = useRouter();
	const { branch_id, org_id } = query;

	const redirect = () => {
		const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}
		${org_id}/${branch_id}/saas/premium-services/duties-taxes-calculator`;

		window.open(redirectUrl, '_self');
	};

	return (
		<div className={styles.container}>
			<div className={styles.icon_container_div}>
				<img src={SuccessGif} alt="cogo" className={styles.icon_img} />
			</div>
			<div className={styles.header_container}>
				<div className={styles.title}>Congratulations!</div>
				<div className={styles.sub_title}>
					Successfully calculated Duties and Taxes.
					<br />
					{' '}
					Below given are the results
				</div>
			</div>
			<div className={styles.scroll_container}>

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
											<div>
												{formatAmount({
													amount   : value,
													currency : resultCurrency,
													options  : {
														notation : 'standard',
														style    : 'currency',
													},
												})}

											</div>
										</div>
									))}
									<div className={styles.dashed_line} />
									<div className={cl`${styles.row} ${styles.total}`}>
										<div>Total</div>
										<div>
											{formatAmount({
												amount   : calculateTotalCharge(taxSetResponse),
												currency : resultCurrency,
												options  : {
													notation : 'standard',
													style    : 'currency',
												},
											})}
										</div>
									</div>
								</div>
							),
						)}
					</div>
				))}
				<div className={cl`${styles.row} ${styles.final_total} ${styles.duties_total}`}>
					<div>Total Duties and Tax</div>
					<div>
						{formatAmount({
							amount   : totalDutiesAndTaxes,
							currency : resultCurrency,
							options  : {
								notation : 'standard',
								style    : 'currency',
							},
						})}

					</div>
				</div>
				<div className={cl`{styles.dashed_line}${styles.dashed_total}`} />
				<div className={cl`${styles.row} ${styles.final_total}`}>
					<div className={styles.flex}>
						<div>Total Landed Cost</div>
						<Tooltip
							placement="top"
							content={<TooltipContent tradeEngineResp={tradeEngineResp} />}
							className={styles.tooltip_style}
						>
							<div className={styles.icon_container}>
								<IcMInfo width={14} height={14} />
							</div>
						</Tooltip>

					</div>
					<div>
						{formatAmount({
							amount   : totalLandedCost,
							currency : resultCurrency,
							options  : {
								notation : 'standard',
								style    : 'currency',
							},
						})}

					</div>
				</div>
			</div>
			<div className={styles.btn_container}>
				<Button size="md" onClick={() => redirect()}>
					Calculate More
				</Button>
			</div>
		</div>
	);
}

export default SuccessModal;
