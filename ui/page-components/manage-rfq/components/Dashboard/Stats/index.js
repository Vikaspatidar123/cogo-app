import React from 'react';

// import { STATS_MAPPING } from '../../../configurations/stats-mapping';

// import {
// 	StyledRow,
// 	StyledCol,
// 	Card,
// 	Title,
// 	Count,
// 	Comparison,
// 	Ratio,
// 	UpwordIcon,
// 	RatioCount,
// } from './styles';
import styles from './styles.module.css';

function Stats({
	// data
}) {
	return (
		<div className={styles.row}>
			{/* {(STATS_MAPPING || []).map((item) => {
				const percentCount = data?.[item.value]?.percent_diff?.toFixed(2);

				const isNegative = percentCount < 0;
				return (
					<StyledCol md={3} key={item.value}>
						<Card bgColor={item.backgroundColor}>
							<Title>{item.title}</Title>
							<Count>{data?.[item.value]?.count || 0}</Count>

							<Comparison fill={item.fill} stroke={item.stroke}>
								<Ratio>
									<UpwordIcon isNegative={isNegative}>{item.icon}</UpwordIcon>
									{item.value === 'contracted' ? (
										<>
											<RatioCount isNegative={isNegative}>
												{Math.abs(data?.[item.value]?.percent_diff) || 0}
												%
											</RatioCount>
											{' '}
											vs last month
										</>
									) : (
										<>
											<RatioCount isNegative={isNegative}>
												{Math.abs(percentCount) || 0}
												%
											</RatioCount>
											{' '}
											vs last month
										</>
									)}
								</Ratio>
								{item.lineGraph}
							</Comparison>
						</Card>
					</StyledCol>
				);
			})} */}
			hii
		</div>
	);
}

export default Stats;
