import { ResponsiveLine } from '@cogoport/charts/line';
import { format, isEmpty } from '@cogoport/utils';

import RenderSkeleton from './RenderSkeleton';
import styles from './styles.module.css';
import ToolTipComponent from './tooltipComponent';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function TrendChart({ labels, datasets = [], trendDetails, loading, currency }) {
	const data = (datasets || []).map((item) => {
		const id = item?.name;
		const temp_data = item?.values?.map((val, index) => ({
			x : format(labels[index], 'yyyy-MM-dd'),
			y : val,
		}));

		return { id, data: temp_data };
	});
	if (loading) {
		return <RenderSkeleton />;
	}

	return (
		<div>
			{!isEmpty(data) && trendDetails?.comparison_chart_data
				?.datasets[GLOBAL_CONSTANTS.zeroth_index].values[GLOBAL_CONSTANTS.zeroth_index] ? (
					<div className={styles.chart}>
						<ResponsiveLine
							margin={{ top: 10, right: 40, bottom: 20, left: 60 }}
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
							curve="natural"
							axisTop={null}
							axisRight={null}
							axisBottom={{
								format         : '%b %d',
								orient         : 'bottom',
								tickSize       : 5,
								tickPadding    : 5,
								tickValues     : 'every 14 days',
								legendOffset   : 36,
								legendPosition : 'middle',
							}}
							axisLeft={{
								orient         : 'left',
								tickSize       : 5,
								tickPadding    : 5,
								tickRotation   : 0,
								legend         : `Rates (${currency})`,
								legendOffset   : -55,
								legendPosition : 'middle',
							}}
							nableGridY
							enableGridX={false}
							enablePoints={false}
							enableSlices={false}
							useMesh
							colors={{ scheme: 'nivo' }}
							pointSize={9}
							pointColor={{ from: 'color', modifiers: [] }}
							pointBorderWidth={2}
							pointBorderColor="#ffffff"
							pointLabelYOffset={-21}
							enableArea
							areaOpacity={0.1}
							isInteractive
							tooltip={({ point }) => (
								<ToolTipComponent point={point} data={data} currency={currency} />
							)}
							legends={[
								{
									anchor            : 'top-right',
									direction         : 'row',
									justify           : false,
									translateX        : 27,
									translateY        : -46,
									itemsSpacing      : 6,
									itemDirection     : 'left-to-right',
									itemWidth         : 85,
									itemHeight        : 10,
									itemOpacity       : 0.75,
									symbolSize        : 13,
									symbolShape       : 'circle',
									symbolBorderColor : 'rgba(0, 0, 0, .5)',
									effects           : [
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
				) : (
					<div className={styles.empty_state}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.empty_state}
							width={400}
							height={400}
						/>
					</div>
				)}
		</div>
	);
}

export default TrendChart;
