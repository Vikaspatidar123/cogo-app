import { Modal, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const calculateTotalCharge = (arr) => (arr || []).reduce((acc, curr) => +acc + +curr.value, 0);

function TooltipContent({ tradeEngineResponse = {} }) {
	const { resultCurrency = '', additionalChargesList = {} } = tradeEngineResponse || {};
	const { incotermCharges: incotermArr = [] } = additionalChargesList || {};

	const { t } = useTranslation(['orderHistory']);

	const TOOLTIP_MAPPING = {
		freightCharges      : t('orderHistory:dt_tooltip_freight'),
		consignmentValue    : t('orderHistory:dt_tooltip_consignment'),
		incotermArr         : t('orderHistory:dt_tooltip_incoterm'),
		totalDutiesAndTaxes : t('orderHistory:dt_total_tax'),
	};

	return (
		<div className={styles.tooltip_container}>
			<div className={styles.heading}>{t('orderHistory:dt_tooltip_title')}</div>
			{Object.keys(TOOLTIP_MAPPING).map((ele) => {
				let amount = tradeEngineResponse?.[ele];
				if (ele === 'incotermArr') {
					amount = calculateTotalCharge(incotermArr);
				}

				return (
					<div className={styles.row}>
						<div>{TOOLTIP_MAPPING[ele]}</div>
						<div>
							{formatAmount({
								amount,
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

function DutiesTaxesModal({ tradeEngineResponse }) {
	const {
		lineItem = [],
		resultCurrency = '',
		totalDutiesAndTaxes = 0,
		totalLandedCost = 0,
		modeOfTransport = '',
		incoterm = '',
	} = tradeEngineResponse || {};

	const { t } = useTranslation(['orderHistory']);

	return (
		<>
			<div className={styles.div}>
				<div className={styles.styled_tag}>
					<div className={styles.incoterm}>
						{incoterm}
					</div>
					<div className={styles.mode}>
						{modeOfTransport}
					</div>
				</div>
			</div>
			<Modal.Body>
				{(lineItem || []).map(({ landedCost = {}, hsNumber = '' }) => (

					<div className={styles.section} key={hsNumber}>
						{(landedCost?.[0]?.taxSet || []).map(({ groupName = '', taxSetResponse = [] }) => (
							<div key={groupName} className={styles.charges}>
								<div className={styles.heading}>{groupName}</div>

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

								<div className={`${styles.Row} ${styles.totoal}`}>
									<div>{t('orderHistory:dt_total')}</div>

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
						))}
					</div>
				))}

				<div className={`${styles.row} ${styles.finalTotal} ${styles.dutiesTotal}`}>
					<div>{t('orderHistory:dt_total_tax')}</div>
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

				<div className={`${styles.dashed_line} ${styles.total}`} />

				<div className={`${styles.row} ${styles.finalTotal}`}>
					<div className={styles.flex}>
						<div>{t('orderHistory:dt_landed_cost')}</div>
						<div>
							<Tooltip
								content={<TooltipContent tradeEngineResponse={tradeEngineResponse} />}
								interactive
							>
								<div className={styles.icon_container}>
									<IcMInfo width={14} height={14} />
								</div>
							</Tooltip>
						</div>
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
			</Modal.Body>
		</>
	);
}
export default DutiesTaxesModal;
