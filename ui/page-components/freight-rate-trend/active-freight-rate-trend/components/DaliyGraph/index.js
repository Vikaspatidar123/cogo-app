import { ResponsiveLine } from '@cogoport/charts/line';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

function Graph({ rates, isMobile = false }) {
    const chart = (isMobile ? rates?.comparison_chart_data?.labels.slice(3, 7)
        : rates?.comparison_chart_data?.labels) || [];

    const finalData1 = chart.map((item, i) => {
        const singleItem = {
            x: item,
            y: (rates?.comparison_chart_data?.datasets[0].values || []).map((sli) => (sli))[i],

        };
        return singleItem;
    });

    const finalData2 = chart.map((item, i) => {
        const singleItem = {
            x: item,
            y: (rates?.comparison_chart_data?.datasets[1].values || []).map((sli) => (sli))[i],

        };
        return singleItem;
    });
    const finalData3 = chart.map((item, i) => {
        const singleItem = {
            x: item,
            y: (rates?.comparison_chart_data?.datasets[2].values || []).map((sli) => (sli))[i],

        };
        return singleItem;
    });

    const data = [
        {
            id: 'Max',
            color: 'hsl(85, 70%, 50%)',
            data: finalData1,
        },
        {
            id: 'Min',
            color: 'hsl(85, 70%, 50%)',
            data: finalData2,
        },
        {
            id: 'Avg',
            color: 'hsl(85, 70%, 50%)',
            data: finalData3,
        },
    ];

    return data;
}
function DaliyGraph({ trendDetails, isMobile = false }) {
    const data = Graph({ rates: trendDetails });
    return (

        !isEmpty(data) && trendDetails?.comparison_chart_data?.datasets[0].values[0] ? (
            <div className={styles.chart}>
                <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: isMobile ? 25 : 100, bottom: 60, left: isMobile ? 40 : 50 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="natural"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 6,
                        tickPadding: 35,
                        tickRotation: 0,

                        legendOffset: 33,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legendOffset: -40,
                        legendPosition: 'middle',
                    }}
                    enableGridY={false}
                    colors={{ scheme: 'nivo' }}
                    pointSize={9}
                    pointColor={{ from: 'color', modifiers: [] }}
                    pointBorderWidth={2}
                    pointBorderColor="#ffffff"
                    pointLabelYOffset={-21}
                    enableArea
                    areaOpacity={0.1}
                    isInteractive
                    useMesh
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'row',
                            justify: false,
                            translateX: 27,
                            translateY: -46,
                            itemsSpacing: 6,
                            itemDirection: 'left-to-right',
                            itemWidth: 85,
                            itemHeight: 10,
                            itemOpacity: 0.75,
                            symbolSize: 13,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>
        ) : <Image src="" width="700" height="490" className={styles.map} />

    );
}
export default DaliyGraph;
