// import Skeleton from 'react-loading-skeleton';

// import EmptyStateIcon from '../../common/assets/ic-empty-not-found.svg';
import { Button } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import countriesHash from '../../commons/utils/getCountryDetails';

import FilterForm from './components/filter';
import FilterModal from './components/filter/filter-modal';
import TrendChart from './components/trend-chart';
import useFetchActiveTrend from './hooks/useActivetrendsDetails';
import useFetchTrendDetails from './hooks/useFetchTrendDetails';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ActiveFreightRateTrend() {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const { back } = useRouter();
	const { isMobile, general } = useSelector((state) => state);
	const { query } = general;
	const id = query.trend_id;

	const [commodities, setCommodities] = useState('general');
	const now = new Date();
	const [dateRangePickerValue, setDateRangePickerValue] = useState({
		startDate : new Date(now.setMonth(now.getMonth() - 6)),
		endDate   : new Date(new Date().setMonth(new Date().getMonth() + 1)),
	});
	const [filteredCurrency, setFilteredCurrency] = useState('USD');
	const [containerSize, setContainerSize] = useState('20');
	const [shippingLine, setShippingLine] = useState();
	const [containerType, setContainerType] = useState('standard');

	const {
		loading, trendDetails, filters, setFilters, refetch,
	} = useFetchTrendDetails({
		id,
	});

	const { activePagination } = useFetchActiveTrend();
	const { destination_port, origin_port, comparison_chart_data } = trendDetails || {};
	const { labels, datasets } = comparison_chart_data || {};
	const { profile } = useSelector((state) => state);
	const { organization } = profile;
	const currency = countriesHash[organization.country_id]?.currency_code;

	const renderSkeleton = () => (
		<div style={{ marginTop: '10px' }}>
			<div className={styles.card}>
				{/* <Skeleton count={3} />
				<Skeleton count={3} /> */}
			</div>
		</div>
	);

	const handleFilterModal = () => {
		setIsFilterModalOpen(!isFilterModalOpen);
	};

	const updateFilters = () => {
		setFilters({
			container_size   : containerSize,
			container_type   : containerType,
			shipping_line_id : shippingLine,
			commodity        : commodities,
			validity_end     : format(dateRangePickerValue.endDate),
			validity_start   : format(dateRangePickerValue.startDate),
			currency         : filteredCurrency,
		});
	};

	useEffect(() => {
		updateFilters();
	}, [
		dateRangePickerValue,
		activePagination,
		commodities,
		filteredCurrency,
		containerSize,
		containerType,
		shippingLine,
	]);

	function Graph() {
		return Object?.keys(datasets || {}).length > 2 ? (
			<TrendChart
				labels={labels || []}
				datasets={datasets || []}
				currency={currency}
				filteredCurrency={filteredCurrency}
			/>
		) : (
			<div className={styles.empty_ctn}>
				{/* <EmptyStateIcon /> */}
				<div className={styles.empty_text}> Data not found</div>
			</div>
		);
	}

	return (
		<>
			{isMobile ? (
				<div className={styles.flex}>
					<IcMArrowBack
						// style={{ height: 20, width: 20, marginRight: 8 }}
						onClick={back}
						fill="white"
					/>
					<div className={styles.text}>
						Freight Rate Trend
					</div>
				</div>
			) : (
				<div className={styles.flex}>
					<IcMArrowBack
						style={{
							height      : 20,
							width       : 20,
							marginRight : 8,
							fill        : '#000',
							cursor      : 'pointer',
						}}
						onClick={back}
						fill="white"
					/>
					<div className={styles.flex}>
						<div className={styles.heading}>Freight Rate Trend</div>
					</div>
				</div>
			)}
			<div className={styles.flex1}>
				<div className={styles.routes}>
					<p className="origin">{origin_port?.name || 'Origin'}</p>
					<IcMPortArrow style={{ margin: '0px 16px' }} />
					<p className="origin">{destination_port?.name || 'Destination'}</p>
				</div>
			</div>
			{!isMobile && (
				<FilterForm
					id={id}
					filters={filters}
					setFilters={setFilters}
					refetch={refetch}
					commodity={commodities}
					setCommodity={setCommodities}
					dateRangePickerValue={dateRangePickerValue}
					setDateRangePickerValue={setDateRangePickerValue}
					filteredCurrency={filteredCurrency}
					setFilteredCurrency={setFilteredCurrency}
					containerSize={containerSize}
					setContainerSize={setContainerSize}
					containerType={containerType}
					setContainerType={setContainerType}
					shippingLine={shippingLine}
					setShippingLine={setShippingLine}
				/>
			)}
			{isFilterModalOpen && (
				<FilterModal
					isOpen={isFilterModalOpen}
					handleFilterModal={handleFilterModal}
					heading={<h1>FILTER</h1>}
					id={id}
					filters={filters}
					setFilters={setFilters}
					refetch={refetch}
					commodity={commodities}
					setCommodity={setCommodities}
					dateRangePickerValue={dateRangePickerValue}
					setDateRangePickerValue={setDateRangePickerValue}
					filteredCurrency={filteredCurrency}
					setFilteredCurrency={setFilteredCurrency}
					containerSize={containerSize}
					setContainerSize={setContainerSize}
					containerType={containerType}
					setContainerType={setContainerType}
					shippingLine={shippingLine}
					setShippingLine={setShippingLine}
				/>
			)}

			<div className={styles.container}>{loading ? renderSkeleton() : Graph()}</div>
			{isMobile && (
				<Button variant="secondary" size="lg" onClick={handleFilterModal}>
					Filter
				</Button>
			)}
		</>
	);
}

export default ActiveFreightRateTrend;
