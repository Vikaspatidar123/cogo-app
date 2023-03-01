import { Button, Popover, Placeholder } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import countriesHash from '../../commons/utils/getCountryDetails';

import FilterForm from './components/filter';
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
		<div className={styles.card}>
			{/* <Skeleton count={3} />
				<Skeleton count={3} /> */}
			<Placeholder height="370px" width="1250px" margin="0px 0px 20px 0px">
				<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M68.1727 38.5588H37.4414V7.82751C37.4414 7.44939 37.132 7.14001
			36.7539 7.14001H34.5195C30.0102
			7.13541 25.5444 8.02124 21.3783 9.74667C17.2122 11.4721 13.4278 14.0032
		10.2422 17.1947C7.10575 20.3214 4.6073 24.0283 2.88594 28.1088C1.09844
		32.3455 0.1875 36.84 0.1875
		41.4806C0.1875 46.1213 1.09844 50.6072 2.88594 54.8439C4.61328 58.926 7.08828 62.6041
		10.2422 65.758C13.3961 68.9119 17.0656 71.3869 21.1562 73.1142C25.3856
		74.9085 29.934 75.8293 34.5281
		75.8213C39.0374 75.8259 43.5032 74.94 47.6693 73.2146C51.8355 71.4892
		55.6199 68.9581 58.8055
		65.7666C61.9594 62.6127 64.4344 58.9431 66.1617 54.8525C67.956 50.6232
		68.8768 46.0748 68.8688
		41.4806V39.2463C68.8602 38.8681 68.5508 38.5588 68.1727 38.5588ZM75.7266
		33.7892L75.5031 31.3658C74.7727
		23.4595 71.2664 16.0002
		65.6117 10.3713C59.9623 4.72658 52.5177 1.2338 44.5656 0.497044L42.1336

		0.273606C41.7297 0.239231
		41.3859 0.548606 41.3859 0.952513V33.9267C41.3859 34.3049 41.6953 34.6142
		42.0734 34.6142L75.0391
		34.5283C75.443 34.5197 75.7609 34.1845 75.7266 33.7892Z"
						fill="#BDBDBD"
					/>
				</svg>
			</Placeholder>
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
			<>
				<div className={styles.heading}>Trend Chart</div>
				<TrendChart
					labels={labels || []}
					datasets={datasets || []}
					currency={currency}
					filteredCurrency={filteredCurrency}
					loading={loading}
				/>
			</>
		) : (
			<div className={styles.empty_ctn}>
				<div className={styles.empty_text}>
					<img
						alt=""
						src="https://cogoport-production.sgp1.digitaloceanspaces.com/8ee5b5489eb1a8ab2d9e2c62bc1f0fae/UI%20standardization.zip"
					/>
				</div>
			</div>
		);
	}

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
					<p className="origin">{origin_port?.name || 'Origin'}</p>
					<IcMPortArrow height={30} width={40} style={{ margin: '0px 16px' }} />
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
