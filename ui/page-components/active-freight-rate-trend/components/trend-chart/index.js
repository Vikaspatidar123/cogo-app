/* eslint-disable array-callback-return */

import { ResponsiveLine } from '@cogoport/charts/line';
import { format } from '@cogoport/utils';

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

	return (
		<div style={{ height: '400px', width: '100%' }}>
			<ResponsiveLine
				margin={{
					top    : 20,
					right  : 0,
					bottom : 50,
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
				axisLeft={{
					legend         : 'linear scale',
					legendOffset   : -36,
					legendPosition : 'middle',
				}}
				axisBottom={{
					format         : '%b %d',
					tickValues     : 'every 15 days',
					legend         : 'time scale',
					legendOffset   : 36,
					legendPosition : 'middle',
				}}
				enableGridY
				enableGridX={false}
				enablePoints={false}
				enableSlices={false}
			/>
		</div>
	);
}

export default TrendChart;
