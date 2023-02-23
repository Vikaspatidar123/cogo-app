/* eslint-disable array-callback-return */
// import Line from '@cogoport/charts/line';
// import { Bar } from '@cogoport/charts/bar';
// import React from 'react';

// import getShortFormatNumber from '@/ui/commons/utils/getShortFromatNumber';

// function TrendChart({ labels, datasets, filteredCurrency }) {
// 	const data = {
// 		title  : 'Trend Chart',
// 		labels,
// 		colors : ['#3b536b', '#E15160', '#5FD85F'],
// 	};

// 	const currency = filteredCurrency;

// 	const lineOptions = {
// 		heatLine   : 1,
// 		regionFill : false,
// 		hideDots   : true,
// 		hideLine   : false,
// 	};

// 	const options = {
// 		axisOptions: {
// 			xAxisMode : 'tick',
// 			xIsSeries : true,
// 		},

// 		tooltipOptions: {
// 			formatTooltipX : (d) => `${d}`.toUpperCase(),
// 			formatTooltipY : (amt) => `${getShortFormatNumber('en', amt, currency)}`,
// 		},
// 	};

// 	const datasets2 = [];

// 	datasets.map((item, indexItem) => {
// 		const { values } = item || {};

// 		let preVal = 0;
// 		let nextVal = 0;
// 		let len = 0;
// 		let key = 0;
// 		let arr = {};
// 		values?.map((val, index) => {
// 			if (val === null && values[index - 1] !== null) {
// 				preVal = values[index - 1];
// 			}
// 			if (val === null) {
// 				len += 1;
// 			}
// 			if (val === null && values[index + 1] !== null) {
// 				nextVal = values[index + 1];
// 			}
// 			if (preVal > 0 && nextVal > 0) {
// 				const a = nextVal > preVal ? (nextVal - preVal) / len : (preVal - nextVal) / len;
// 				arr = { ...arr, [key]: a };
// 				key += 1;
// 				preVal = 0;
// 				nextVal = 0;
// 				len = 0;
// 			}
// 		});

// 		let count = 0;
// 		const newData = values?.map((val, index) => {
// 			if (val === null && values[index + 1] !== null) {
// 				count += 1;
// 			}
// 			if (val === null && Object.keys(arr).length === count) {
// 				arr[count] = 5;
// 			}
// 			if (val === null) {
// 				values[index] = values[index - 1] + arr[count];
// 			}
// 			return val === null ? values[index] : val;
// 		});

// 		datasets2.push({
// 			...datasets[indexItem],
// 			values: newData?.filter((n) => n !== null) || newData,
// 		});
// 	});

// 	return (
// 		<div>
// 			<Line
// 				id="trendChart"
// 				{...data}
// 				datasets={datasets2 || []}
// 				exportable={false}
// 				lineOptions={lineOptions}
// 				options={options}
// 				height="400"
// 			/>
// 		</div>
// 	);
// }

// export default TrendChart;
import { ResponsiveLine } from '@cogoport/charts/line';

function TrendChart({ labels, datasets = [] }) {
	const data = [];
	const today = new Date();

	function formatDate(date) {
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		if (dd < 10) {
			dd = `0${dd}`;
		}
		if (mm < 10) {
			mm = `0${mm}`;
		}
		return `${yyyy}-${mm}-${dd}`;
	}

	(datasets || []).forEach((item) => {
		const id = item.name;
		let temp_data = [];
		temp_data = item.values.map((val, idx) => ({
			x : formatDate(today, labels[idx]),
			y : val,
		}));
		data.push({ id, data: temp_data });
	});

	return (
		<div style={{ height: '400px', width: '100%' }}>
			<ResponsiveLine
				margin={{
					top    : 50,
					right  : 0,
					bottom : 100,
					left   : 40,
				}}
				data={data}
				xScale={{
					type      : 'time',
					format    : '%Y-%m-%d',
					useUTC    : false,
					precision : 'day',
				}}
				xFormat="time:%Y-%m-%d"
				yScale={{
					type: 'linear',
				}}
				axisLeft={{
					legend       : 'linear scale',
					legendOffset : 12,
				}}
				axisBottom={{
					format       : '%b %d',
					tickValues   : 'every 4 days',
					legend       : 'time scale',
					legendOffset : -12,
					orient       : 'bottom',
					tickSize     : 5,
					tickPadding  : 5,
				}}
				enablePointLabel
				pointSize={16}
				pointBorderWidth={1}
				pointBorderColor={{
					from      : 'color',
					modifiers : [['darker', 0.3]],
				}}
				useMesh
				enableSlices={false}
			/>
		</div>
	);
}

export default TrendChart;
