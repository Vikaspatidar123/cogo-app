/* eslint-disable no-restricted-globals */
import { Tooltip, cl, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

const ZERO_INDEX = GLOBAL_CONSTANTS.zeroth_index;

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
	const { t } = useTranslation(['dutiesTaxesCalculator']);
	const incotermAmmount = calculateTotalCharge(incotermArr);

	return (
		<div className={styles.tooltip_container}>
			<div className={styles.tooltip_heading}>{t('dutiesTaxesCalculator:success_modal_tooltip_title')}</div>
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

	const { t } = useTranslation(['dutiesTaxesCalculator']);

	const redirect = () => {
		const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}
		${org_id}/${branch_id}/saas/premium-services/duties-taxes-calculator`;

		window.open(redirectUrl, '_self');
	};

	return (
		<div className={styles.container}>
			<div className={styles.icon_container_div}>
				<Image src={GLOBAL_CONSTANTS.image_url.success_gif} alt="success" height={130} width={130} />
			</div>
			<div className={styles.header_container}>
				<div className={styles.title}>{t('dutiesTaxesCalculator:success_modal_title')}</div>
				<div className={styles.sub_title}>
					{t('dutiesTaxesCalculator:success_modal_subtitle_1')}
					<br />
					{' '}
					{t('dutiesTaxesCalculator:success_modal_subtitle_2')}

				</div>
			</div>
			<div className={styles.scroll_container}>

				{(lineItem || []).map(({ landedCost = {}, hsNumber = '' }) => (
					<div key={hsNumber}>
						<div className={styles.section_heading}>
							<div className={styles.title_div}>
								{t('dutiesTaxesCalculator:success_modal_section_1_title')}
							</div>
							<div className={styles.line} />
						</div>
						{(landedCost?.[ZERO_INDEX]?.taxSet || []).map(
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
										<div>{t('dutiesTaxesCalculator:success_modal_section_1_subtitle')}</div>
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
					<div>{t('dutiesTaxesCalculator:success_modal_section_2_title')}</div>
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
						<div>{t('dutiesTaxesCalculator:success_modal_section_3_title')}</div>
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
					{t('dutiesTaxesCalculator:success_modal_btn_text')}
				</Button>
			</div>
		</div>
	);
}

export default SuccessModal;
