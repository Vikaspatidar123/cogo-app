import { ResponsiveLine } from '@cogoport/charts';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function TrendChart({ labels, datasets = [] }) {
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
			[x.id]: x.data.filter((y) => y.x === date)?.[0]?.y,
		}));
		return (
			<div className={styles.styled_tip}>
				<div className={styles.max}>{`Max - ${newData[0]?.Max}`}</div>
				<div className={styles.min}>{`Min - ${newData[1]?.Min}`}</div>
				<div className={styles.avg}>{`Avg - ${newData[2]?.Avg}`}</div>
			</div>
		);
	};

	return (
		<div style={{ height: '400px', width: '100%' }}>
			<ResponsiveLine
				margin={{
					top    : 90,
					right  : 0,
					bottom : 40,
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
				legends={[
					{
						anchor        : 'top-right',
						direction     : 'column',
						justify       : false,
						translateX    : 18,
						translateY    : -65,
						itemWidth     : 100,
						itemHeight    : 20,
						itemsSpacing  : 4,
						symbolSize    : 10,
						symbolShape   : 'circle',
						itemDirection : 'left-to-right',
						itemTextColor : '#777',
						effects       : [
							{
								on    : 'hover',
								style : {
									itemBackground : 'rgba(0, 0, 0, .03)',
									itemOpacity    : 1,
								},
							},
						],
					},
				]}
			/>
		</div>
	);
}

export default TrendChart;
