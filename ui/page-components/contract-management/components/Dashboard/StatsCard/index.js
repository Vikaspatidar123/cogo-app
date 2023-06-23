import { cl, Placeholder } from '@cogoport/components';
import React from 'react';

import { STATS_MAPPING } from '../../../configurations/stats-mapping';

import styles from './styles.module.css';

function StatsCard({ data, loading }) {
	return (
		<div className={styles.styled_row}>
			{(STATS_MAPPING || []).map((item) => {
				const isLoss = data?.[item.count]?.percentage > 0;
				return (
					<div className={styles.styled_col}>
						<div className={styles.card} style={{ background: `${item.backgroundColor}` }}>
							<div className={styles.title}>{item.title}</div>
							<div className={styles.count}>
								{loading ? (
									<Placeholder height="28px" width="60px" />
								) : (
									<>
										{' '}
										{data?.[item.count]?.count < 9
											&& data?.[item.count]?.count !== 0
											? `0${data?.[item.count]?.count}`
											: data?.[item.count]?.count || 0}
									</>
								)}
							</div>

							<div
								className={cl`${styles.comparison}
							    ${styles.comparison[item.className]}`}
							>
								<div className={styles.ratio}>
									{loading ? (
										<Placeholder height="20px" width="170px" />
									) : (
										<>
											{' '}
											{item.count === 'active' ? (
												<>
													{isLoss ? <div className={styles.downward_icon}>{item.icon}</div>
														: <div className={styles.upword_icon}>{item.icon}</div>}
													<div className={styles.ratio_count}>$0 saved</div>
												</>
											) : (
												<>
													<div className={styles.upword_icon}>{item.icon}</div>
													{isLoss ? <div className={styles.loss_color}>{item.icon}</div>
														: (
															<div className={styles.ratio_count}>
																{Math.abs(data?.[item.count]?.percentage)}
																%
															</div>
														)}
													vs last month
												</>
											)}
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

export default StatsCard;
