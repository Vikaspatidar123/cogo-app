import { ToolTip } from '@cogoport/components';

import {
	SideContainer, BarGraphContainer, BarGraph, GraphData,
} from '../style';

function Product({ productList = [], loading }) {
	const colorMapping = ['#F9C87F', '#B5A4FE', '#B2E2E8', '#889AB8'];
	return (
		<>
			{!loading && (
				<BarGraphContainer>
					<div className="top">
						{productList
							.slice(0)
							.reverse()
							.map((x, i) => (
								<div className="head">
									<div className="name">
										{x.name?.length > 5 ? (
											<ToolTip theme="light" placement="top" content={x.name}>
												<div>{`${x.name.substring(0, 10)}..`}</div>
											</ToolTip>
										) : (
											<div>{x.name}</div>
										)}
									</div>

									<ToolTip
										theme="light"
										placement="top"
										content={`${x.profitPercent}%`}
									>
										<BarGraph>
											<GraphData
												percent={x.profitRatioPercent || 0}
												active={colorMapping[i]}
											/>
										</BarGraph>
									</ToolTip>

									<SideContainer>
										{x.productsSold?.toString().length > 3 ? (
											<ToolTip theme="light" placement="top" content={x.productsSold}>
												<div>{`${x?.productsSold?.toString().substring(0, 4)}`}</div>
											</ToolTip>
										) : (
											<div>{x.productsSold}</div>
										)}
									</SideContainer>
								</div>
							))}
					</div>
				</BarGraphContainer>
			)}
		</>
	);
}

export default Product;
