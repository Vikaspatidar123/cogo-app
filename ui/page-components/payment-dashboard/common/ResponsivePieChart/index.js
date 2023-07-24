import { ResponsivePie } from '@cogoport/charts/pie';
import { Button } from '@cogoport/components';
import { useState } from 'react';

import COLORS from '../../constants/pie-color';
import EmptyState from '../EmptyState';
import PopoverLoader from '../Loader';

import GraphListView from './GraphListView';
import PieChartLegends from './PieChartLegends';
import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatAmount from '@/ui/commons/utils/formatAmount';

const geo = getGeoConstants();
function ResponsivePieChart({ data, heading, isKamWise, loading }) {
	const [showListView, setShowListView] = useState(false);
	const [isSortBy, setIsSortBy] = useState('');
	const isEmpty = (data || []).every((el) => el.value === 0);

	const sortedData = [...data];

	if (isSortBy === 'asc') {
		(sortedData || []).sort((p1, p2) => Number(p1.value) - Number(p2.value));
	} else if (isSortBy === 'desc') {
		(sortedData || []).sort((p1, p2) => Number(p2.value) - Number(p1.value));
	}

	function RenderBody() {
		if (isEmpty && !loading) {
			return <EmptyState containerHeight="230px" />;
		}

		if (loading) {
			return <PopoverLoader containerHeight="230px" />;
		}
		if (showListView) {
			return (
				<GraphListView
					isKamWise={isKamWise}
					setIsSortBy={setIsSortBy}
					isSortBy={isSortBy}
					sortedData={sortedData}
				/>
			);
		}

		return (
			<>
				<div className={styles.graph_wrapper}>
					<ResponsivePie
						data={data}
						margin={{
							top: 20,
							right: 30,
							bottom: 20,
							left: 20,
						}}
						endAngle={-360}
						cornerRadius={3}
						activeOuterRadiusOffset={8}
						colors={COLORS}
						borderWidth={1}
						borderColor={{
							from: 'color',
							modifiers: [['darker', 0.2]],
						}}
						enableArcLinkLabels={false}
						enableArcLabels={false}
						arcLinkLabelsTextColor="#333333"
						arcLinkLabelsThickness={2}
						arcLinkLabelsColor="black"
						arcLabel="value"
						arcLabelsRadiusOffset={0.55}
						arcLabelsSkipAngle={5}
						arcLabelsTextColor={{
							from: 'color',
							modifiers: [['darker', 2]],
						}}
						tooltip={({ datum: { label, value, color } }) => (
							<div className={styles.tool_tip_div}>
								<div className={styles.tool_tip_title}>
									<div
										className={styles.color_dot}
										style={{ background: `${color} ||#5936f0` }}
									/>
									{label}
									:
									<div className={styles.tool_tip_amount}>
										{formatAmount({
											amount: value || 0,
											currency: geo.country.currency.code,
											options: {
												style: 'currency',
												currencyDisplay: 'symbol',
												maximumFractionDigits: 0,
											},
										})}
									</div>
								</div>
							</div>
						)}
					/>
				</div>
				<PieChartLegends data={data} isKamWise={isKamWise} colors={COLORS} />
			</>
		);
	}

	return (
		<div className={styles.col}>
			<div className={styles.flex}>
				<div className={styles.heading}>{heading}</div>
				<Button
					type="button"
					onClick={() => setShowListView(!showListView)}
					size="sm"
					themeType="secondary"
				>
					{showListView ? 'Graph View' : 'List View'}
				</Button>
			</div>
			<div
				className={styles.container}
				style={{ borderRight: `${isKamWise ? '1px solid rgb(198, 219, 239)' : 'none'}` }}
			>
				<RenderBody />
			</div>
		</div>
	);
}

export default ResponsivePieChart;
