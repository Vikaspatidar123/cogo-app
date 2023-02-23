/* eslint-disable array-callback-return */
// import { AreaChart } from '@cogo/charts';
import React from 'react';

import getShortFormatNumber from '@/ui/commons/utils/getShortFromatNumber';

function TrendChart({ labels, datasets, filteredCurrency }) {
	const data = {
		title  : 'Trend Chart',
		labels,
		colors : ['#3b536b', '#E15160', '#5FD85F'],
	};

	const currency = filteredCurrency;

	const lineOptions = {
		heatLine   : 1,
		regionFill : false,
		hideDots   : true,
		hideLine   : false,
	};

	const options = {
		axisOptions: {
			xAxisMode : 'tick',
			xIsSeries : true,
		},

		tooltipOptions: {
			formatTooltipX : (d) => `${d}`.toUpperCase(),
			formatTooltipY : (amt) => `${getShortFormatNumber('en', amt, currency)}`,
		},
	};

	const datasets2 = [];

	datasets.map((item, indexItem) => {
		const { values } = item || {};

		let preVal = 0;
		let nextVal = 0;
		let len = 0;
		let key = 0;
		let arr = {};
		values?.map((val, index) => {
			if (val === null && values[index - 1] !== null) {
				preVal = values[index - 1];
			}
			if (val === null) {
				len += 1;
			}
			if (val === null && values[index + 1] !== null) {
				nextVal = values[index + 1];
			}
			if (preVal > 0 && nextVal > 0) {
				const a = nextVal > preVal ? (nextVal - preVal) / len : (preVal - nextVal) / len;
				arr = { ...arr, [key]: a };
				key += 1;
				preVal = 0;
				nextVal = 0;
				len = 0;
			}
		});

		let count = 0;
		const newData = values?.map((val, index) => {
			if (val === null && values[index + 1] !== null) {
				count += 1;
			}
			if (val === null && Object.keys(arr).length === count) {
				arr[count] = 5;
			}
			if (val === null) {
				values[index] = values[index - 1] + arr[count];
			}
			return val === null ? values[index] : val;
		});

		datasets2.push({
			...datasets[indexItem],
			values: newData?.filter((n) => n !== null) || newData,
		});
	});

	return (
		<>123</>
		// <AreaChart
		// 	id="trendChart"
		// 	{...data}
		// 	datasets={datasets2 || []}
		// 	exportable={false}
		// 	lineOptions={lineOptions}
		// 	options={options}
		// 	height="400"
		// />
	);
}

export default TrendChart;
