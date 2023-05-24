import { cl } from '@cogoport/components';

import iconUrl from '../../../../../utils/iconUrl.json';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function LandedCost({ landedCost, resultCurrency = 'INR' }) {
	const { taxSet } = landedCost?.[0] || {};
	let totalone = 0;
	(taxSet || []).map((item) => {
		totalone += item.taxSetResponse.reduce((acc, { value = 0 }) => +acc + +value, 0);
		return totalone;
	});

	return (
		<>
			<div className={styles.title}>
				<img className="image" src={iconUrl?.taxSvg} alt="" />
				Duties & Taxes
			</div>
			<div className={styles.container}>
				<div className={cl`${styles.scroll} ${taxSet?.length > 0 && styles.container_height}`}>
					{(taxSet || []).map(({ groupName, taxSetResponse }) => (
						<div className={styles.card} key={groupName}>
							<div className={styles.dotFlex}>
								<div className={cl`${styles.text} ${styles.auto}`}>{groupName}</div>
							</div>
							<div>
								{(taxSetResponse || []).map((x) => (
									<div key={x.name}>
										<div className={styles.dotFlex}>
											<div className={cl`${styles.text} ${styles.sub}
											${styles.auto}`}
											>
												{x.name}
											</div>
											<div className={cl`${styles.text} ${styles.sub} ${styles.auto}`}>
												{formatAmount({
													amount   : x.value,
													currency : resultCurrency,
													options  : {
														style                 : 'currency',
														currencyDisplay       : 'symbol',
														compactDisplay        : 'short',
														maximumFractionDigits : 2,
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
					<div>
						{taxSet?.length > 0 ? (
							<div className={cl`${styles.text_total}
							${styles.auto} ${styles.landedtotal}`}
							>
								TOTAL
							</div>
						) : (
							<div className={cl`${styles.text_total} ${styles.sorry}`}>
								Sorry!!!! We are unable to fetch duties and taxes. Please try again after
								some time.
							</div>
						)}
					</div>
					<div>
						<div className={`${styles.text_total} ${styles.auto}`}>
							{taxSet?.length > 0 ? shortFormatNumber(totalone, resultCurrency) : ''}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default LandedCost;
