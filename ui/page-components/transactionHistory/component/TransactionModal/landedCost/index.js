import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const calculateTotalDuties = ({ taxSet }) => {
	let totalDuties = 0;
	(taxSet || []).forEach((item) => {
		totalDuties += (item.taxSetResponse ?? []).reduce((acc, itm) => +acc + +(itm?.value ?? 0), 0);
	});
	return totalDuties;
};

function LandedCost({ landedCost, resultCurrency = '' }) {
	const { taxSet } = landedCost?.[0] || {};

	const { t } = useTranslation(['transactionHistory']);

	const totalDuties = calculateTotalDuties({ taxSet });

	return (
		<div className={styles.container}>
			<div className={styles.scrollable}>

				{(taxSet || []).map(({ groupName, taxSetResponse }) => (
					<div className={styles.card} key={groupName}>
						<div className={styles.row}>
							<div className={styles.text}>{groupName.toUpperCase()}</div>
						</div>

						<div>
							{(taxSetResponse || []).map((resp, index) => (
								<div key={`${resp?.name}_${index + 1}`} className={cl`${styles.row} ${styles.padding}`}>
									<div className={cl`${styles.col} ${styles.dotFlex}`}>
										<div className={styles.text}>{resp.name}</div>
									</div>

									<div className={styles.dot} />

									<div className={cl`${styles.col} ${styles.paddngFlex}`}>
										<div className={styles.text}>
											{formatAmount({
												amount   : resp.value,
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
					</div>
				))}
			</div>

			<div className={styles.card_total}>
				<div className={styles.col}>
					{!isEmpty(taxSet) ? (
						<div className={styles.text_total}>{t('transactionHistory:result_quotation_dt_label')}</div>
					) : (
						<div className={styles.text_total}>
							{t('transactionHistory:result_quotation_dt_empty')}
						</div>
					)}
				</div>

				<div className={styles.row}>
					<div className={styles.text_total}>
						{!isEmpty(taxSet)
							? formatAmount({
								amount   : totalDuties,
								currency : resultCurrency,
								options  : {
									notation : 'standard',
									style    : 'currency',
								},
							})
							: ''}
					</div>
				</div>
			</div>
		</div>
	);
}
export default LandedCost;
