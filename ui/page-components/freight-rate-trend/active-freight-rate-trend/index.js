import { Button, Popover, Tabs, TabPanel } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import FilterForm from './components/filter';
import TrendChart from './components/trend-chart';
import { TAB_CONTROL } from './constants';
import useFetchActiveTrend from './hooks/useActivetrendsDetails';
import useFetchTrendDetails from './hooks/useFetchTrendDetails';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ActiveFreightRateTrend() {
	const { back, query } = useRouter();

	const id = query.trend_id;

	const { t } = useTranslation(['frt']);

	const [activeTab, setActiveTab] = useState('monthly');

	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

	const { activePagination } = useFetchActiveTrend();

	const {
		loading, trendDetails, filters, setFilters, refetch,
	} = useFetchTrendDetails({
		id,
		activeTab,
		activePagination,
	});

	const { destination_port, origin_port, comparison_chart_data } = trendDetails || {};
	const { labels, datasets } = comparison_chart_data || {};

	const handleFilterModal = () => {
		setIsFilterModalOpen(!isFilterModalOpen);
	};
	const control = TAB_CONTROL({ t });
	return (
		<>
			<div className={styles.flex1}>
				<Popover placement="top" trigger="mouseenter" render="Go Back">
					<IcMArrowBack
						style={{
							height : 20,
							width  : 20,
							fill   : '#000',
							cursor : 'pointer',
						}}
						onClick={back}
						fill="white"
					/>
				</Popover>

				<div className={styles.routes}>
					<p className="origin">{origin_port?.name || t('frt:stepper_origin')}</p>
					<IcMPortArrow height={30} width={40} style={{ margin: '0px 16px' }} />
					<p className="origin">{destination_port?.name || t('frt:stepper_destination')}</p>
				</div>
			</div>

			<div className={styles.filter_web_view}>
				<FilterForm
					id={id}
					filters={filters}
					setFilters={setFilters}
					refetch={refetch}

				/>
			</div>

			<Tabs
				themeType="tertiary"
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				{control.map((item) => (
					<TabPanel
						key={item.name}
						name={item.name}
						title={item.title}
					/>
				))}

			</Tabs>

			<div className={styles.container}>
				<div className={styles.heading}>{t('frt:trend_chart_title')}</div>
				<TrendChart
					trendDetails={trendDetails}
					labels={labels}
					datasets={datasets || []}
					loading={loading}
					currency={filters.filteredCurrency}
				/>

			</div>
			<div className={styles.filter_mobile_view}>
				<Button variant="secondary" size="sm" onClick={handleFilterModal}>
					{t('frt:filter')}
				</Button>
			</div>

		</>
	);
}

export default ActiveFreightRateTrend;
