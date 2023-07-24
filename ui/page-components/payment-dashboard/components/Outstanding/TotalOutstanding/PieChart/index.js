import { ResponsivePie } from '@cogoport/charts/pie';
import React from 'react';

const data = [
	{
		id    : 'cash',
		label : '$ 2000000',
		value : 400,
		color : '#215894',
	},
	{
		id    : 'pay later',
		label : '$ 500000',
		value : 900,
	},
];
function Pie() {
	return (
		<ResponsivePie
			data={data}
			margin={{
				top    : 50,
				right  : 90,
				bottom : 50,
				left   : -110,
			}}
			innerRadius={0.05}
			padAngle={5}
			justify
			cornerRadius={3}
			enableArcLabels={false}
			enableArcLinkLabels={false}
			isInteractive
			colors={['#F9C87F', '#66ACF7']}
			legends={[
				{
					anchor        : 'right',
					direction     : 'column',
					translateX    : 10,
					translateY    : 0,
					itemsSpacing  : 10,
					itemWidth     : 100,
					itemHeight    : 30,
					itemTextColor : '#000',
					itemDirection : 'left-to-right',
					symbolSize    : 18,
					symbolShape   : ({ x, y, fill }) => (
						<rect x={x} y={y} width={8} height={25} rx="5" ry="5" fill={fill} />
					),
					effects: [
						{
							on    : 'hover',
							style : { itemTextColor: '#66ACF7' },
						},
					],
				},
			]}
		/>
	);
}

export default function PieCharts() {
	return (
		<div style={{ width: 300, height: 200 }}>
			<Pie data={data} />
		</div>
	);
}
