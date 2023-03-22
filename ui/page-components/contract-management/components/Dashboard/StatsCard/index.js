import React from 'react';
import { STATS_MAPPING } from '../../../configurations/stats-mapping';

import {
	StyledRow,
	StyledCol,
	Card,
	Title,
	Count,
	Comparison,
	Ratio,
	UpwordIcon,
	RatioCount,
	SkeletonWrapper,
} from './styles';

const StatsCard = ({ data, loading }) => {
	return (
		<StyledRow>
			{(STATS_MAPPING || []).map((item) => {
				const isLoss = data?.[item.count]?.percentage > 0;
				return (
					<StyledCol md={4}>
						<Card bgColor={item.backgroundColor}>
							<Title>{item.title}</Title>
							<Count>
								{loading ? (
									<SkeletonWrapper height="28px" width="60px" />
								) : (
									<>
										{data?.[item.count]?.count < 9 &&
										data?.[item.count]?.count !== 0
											? `0${data?.[item.count]?.count}`
											: data?.[item.count]?.count || 0}
									</>
								)}
							</Count>

							<Comparison fill={item.fill} stroke={item.stroke}>
								<Ratio>
									{loading ? (
										<SkeletonWrapper height="20px" width="170px" />
									) : (
										<>
											{item.count === 'active' ? (
												<>
													<UpwordIcon>{item.icon}</UpwordIcon>
													<RatioCount>$0 saved</RatioCount>
												</>
											) : (
												<>
													<UpwordIcon loss={isLoss}>{item.icon}</UpwordIcon>
													<RatioCount loss={isLoss}>
														{Math.abs(data?.[item.count]?.percentage)}%
													</RatioCount>
													vs last month
												</>
											)}
										</>
									)}
								</Ratio>
								{item.lineGraph}
							</Comparison>
						</Card>
					</StyledCol>
				);
			})}
		</StyledRow>
	);
};

export default StatsCard;
