import { ResponsiveLine } from '@cogoport/charts/line';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';
import ToolTipComponent from './tooltipComponent';

function TrendChart({ labels, datasets = [] }) {
	const data = (datasets || []).map((item) => {
		const id = item.name;
		const temp_data = item.values.map((val, index) => ({
			x : format(labels[index], 'yyyy-MM-dd'),
			y : val,
		}));
		return { id, data: temp_data };
	});

	return (
		<div>
			<div className={styles.legend}>
				<div className={styles.legend_list}>
					<div className={styles.circle1} />
					<div className={styles.legend_text}>Avg</div>
				</div>
				<div className={styles.legend_list}>
					<div className={styles.circle2} />
					<div className={styles.legend_text}>Min</div>
				</div>
				<div className={styles.legend_list}>
					<div className={styles.circle3} />
					<div className={styles.legend_text}>Max</div>
				</div>
			</div>
			<div className={styles.chart_container}>
				<div className={styles.chart}>
					<ResponsiveLine
						margin={{
							top    : 10,
							right  : 0,
							bottom : 70,
							left   : 60,
						}}
						data={data}
						xScale={{
							type      : 'time',
							format    : '%Y-%m-%d',
							useUTC    : false,
							precision : 'day',
						}}
						yScale={{
							type: 'linear',
						}}
						xFormat="time:%Y-%m-%d"
						axisLeft={{
							orient         : 'left',
							tickSize       : 5,
							tickPadding    : 5,
							tickRotation   : 0,
							legend         : 'Rates (USD)',
							legendOffset   : -40,
							legendPosition : 'middle',
						}}
						axisBottom={{
							format         : '%b %d',
							orient         : 'bottom',
							tickSize       : 5,
							tickPadding    : 5,
							tickValues     : 'every 15 days',
							legend         : 'Date',
							legendOffset   : 36,
							legendPosition : 'middle',
						}}
						// eslint-disable-next-line react/no-unstable-nested-components
						tooltip={({ point }) => (
							<ToolTipComponent point={point} data={data} />
						)}
						enableGridY
						enableGridX={false}
						enablePoints={false}
						enableSlices={false}
						pointColor={{ theme: 'background' }}
						pointBorderWidth={5}
						pointBorderColor={{ from: 'serieColor' }}
						pointLabelYOffset={-24}
						useMesh
					/>
				</div>
			</div>
		</div>
	);
}

export default TrendChart;
