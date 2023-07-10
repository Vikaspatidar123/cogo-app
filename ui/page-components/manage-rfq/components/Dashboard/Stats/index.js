import React from 'react';

import { STATS_MAPPING } from '../../../configurations/stats-mapping';

import styles from './styles.module.css';

function Stats({ data = {} }) {
	return (
		<div className={styles.row}>
			{(STATS_MAPPING || []).map((item) => {
				const percentCount = data?.[item.value]?.percent_diff?.toFixed(2);

				const isNegative = percentCount < 0;
				return (
					<div className={styles.column} key={item.value}>
						<div className={styles[`card_${item.color}`]}>
							<div className={styles.title}>{item.title}</div>
							<div className={styles.count}>{data?.[item.value]?.count || 0}</div>
							<div
								className={styles.comparision}
								color={item.fill}
								stroke={item.stroke}
							>
								<div className={styles.ratio}>
									<div className={isNegative ? styles.downward_icon : styles.upward_icon}>
										{item.icon}
									</div>
									{item.value === 'contracted' ? (
										<>
											<div className={isNegative
												? styles.ratio_count_negative
												: styles.ratio_count_positive}
											>
												{Math.abs(data?.[item.value]?.percent_diff) || 0}
												%
											</div>
											{' '}
											vs last month
										</>
									) : (
										<>
											<div className={isNegative
												? styles.ratio_count_negative
												: styles.ratio_count_positive}
											>
												{Math.abs(percentCount) || 0}
												%
											</div>
											{' '}
											vs last month
										</>
									)}
								</div>
								{item.lineGraph}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Stats;
