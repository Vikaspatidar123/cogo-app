import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function Product({ productList = [], loading }) {
	const colorMapping = ['#F9C87F', '#B5A4FE', '#B2E2E8', '#889AB8'];
	return (
		<div>
			{!loading && (
				<div className={styles.bar_graph_container}>
					<div className="top">
						{productList
							.slice(0)
							.reverse()
							.map((x, i) => (
								<div className="head">
									<div className="name">
										{x.name?.length > 5 ? (
											<Tooltip theme="light" placement="top" content={x.name}>
												<div>{`${x.name.substring(0, 10)}..`}</div>
											</Tooltip>
										) : (
											<div>{x.name}</div>
										)}
									</div>

									<Tooltip
										theme="light"
										placement="top"
										content={`${x.profitPercent}%`}
									>
										<div className={styles.bar_graph}>
											<div
												className={styles.graph_data}
												style={{
													background : colorMapping[i],
													width      : x.profitRatioPercent.width || 0,
												}}
												// percent={x.profitRatioPercent || 0}
												// active={colorMapping[i]}
											/>
										</div>
									</Tooltip>

									<div className={styles.side_container}>
										{x.productsSold?.toString().length > 3 ? (
											<Tooltip theme="light" placement="top" content={x.productsSold}>
												<div>{x?.productsSold?.toString().substring(0, 4)}</div>
											</Tooltip>
										) : (
											<div>{x.productsSold}</div>
										)}
									</div>
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Product;
