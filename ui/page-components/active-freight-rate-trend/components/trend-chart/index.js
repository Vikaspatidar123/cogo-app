import { format } from '@cogoport/utils';
import { ResponsiveLine } from '@nivo/line';

import styles from './styles.module.css';

function TrendChart({ labels, datasets = [], loading }) {
	const data = [];
	(datasets || []).forEach((item) => {
		const id = item.name;
		let temp_data = [];
		temp_data = item.values.map((val, index) => ({
			x : format(labels[index], 'yyyy-MM-dd'),
			y : val,
		}));
		data.push({ id, data: temp_data });
	});

	const toolTip = (point) => {
		const date = format(point?.data?.x, 'yyyy-MM-dd');
		const newData = data.map((x) => ({
			[x.id]: x.data.filter((y) => y.x === date)?.[0]?.y.toFixed(2),
		}));
		return (
			<div className={styles.styled_tip}>
				<div className={styles.text}>{date}</div>
				<div className={styles.data}>
					<div className={styles.line}>
						<div className={styles.horizontal1} />
						<div>{newData[0]?.Max}</div>
						<div className={styles.text}>Max</div>
					</div>
					<div className={styles.line}>
						<div className={styles.horizontal2} />
						<div>{newData[1]?.Min}</div>
						<div className={styles.text}>Min</div>
					</div>
					<div className={styles.line}>
						<div className={styles.horizontal3} />
						<div>{newData[2]?.Avg}</div>
						<div className={styles.text}>Avg</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
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
							legend         : 'linear scale',
							legendOffset   : -40,
							legendPosition : 'middle',
						}}
						axisBottom={{
							format         : '%b %d',
							orient         : 'bottom',
							tickSize       : 5,
							tickPadding    : 5,
							tickValues     : 'every 15 days',
							legend         : 'time scale',
							legendOffset   : 36,
							legendPosition : 'middle',
						}}
						tooltip={({ point }) => toolTip(point)}
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
		</div>
	);
}

export default TrendChart;
