import styles from './styles.module.css';

import getShortFormatNumber from '@/ui/commons/utils/getShortFormatNumber';

function LandedCost({ landedCost, resultCurrency = 'INR' }) {
	const { taxSet } = landedCost?.[0] || {};
	let totalone = 0;
	(taxSet || []).map((item) => {
		// eslint-disable-next-line no-unsafe-optional-chaining
		totalone += item.taxSetResponse.reduce((acc, itm) => +acc + +itm?.value, 0);
		return totalone;
	});

	return (
		<div className={styles.container}>
			<div className={styles.scrollable}>
				{(taxSet || []).map(({ groupName, taxSetResponse }) => (
					<div className={styles.card} key={groupName}>
						<div className={styles.row}>
							<div className={styles.text}>{groupName.toUpperCase()}</div>
						</div>
						<div>
							{(taxSetResponse || []).map((x) => (
								<div className={`${styles.row}  ${styles.padding}`}>
									<div className={`${styles.col} ${styles.dotFlex}`}>
										<div className={styles.text}>{x.name}</div>
										<div className="dot" />
									</div>
									<div className={`${styles.col} ${styles.paddngFlex}`}>
										<div className={styles.text}>
											{getShortFormatNumber(x.value, resultCurrency)}
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
					{taxSet?.length > 0 ? (
						<div className={styles.text_total}>Total Landed Cost</div>
					) : (
						<div className={styles.text_total}>
							Sorry!!!! We are unable to fetch duties and taxes. Please try again after
							some time.
						</div>
					)}
				</div>
				<div className={styles.row}>
					<div className={styles.text_total}>
						{taxSet?.length > 0 ? getShortFormatNumber(totalone, resultCurrency) : ''}
					</div>
				</div>
			</div>
		</div>
	);
}
export default LandedCost;
