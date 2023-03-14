import { Button, Popover, Placeholder } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import FilterForm from './components/filter';
import TrendChart from './components/trend-chart';
import useFetchActiveTrend from './hooks/useActivetrendsDetails';
import useFetchTrendDetails from './hooks/useFetchTrendDetails';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import countriesHash from '@/ui/commons/utils/getCountryDetails';

function ActiveFreightRateTrend() {
	const { isMobile, general } = useSelector((state) => state);
	const { query } = general;
	const id = query.trend_id;
	const { back } = useRouter();

	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
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
			<Placeholder height="370px" width="1250px" margin="0px 0px 20px 0px" />
		</div>
	);

	const handleFilterModal = () => {
		setIsFilterModalOpen(!isFilterModalOpen);
	};

	useEffect(() => {
		setFilters({
			container_size   : containerSize,
			container_type   : containerType,
			shipping_line_id : shippingLine,
			commodity        : commodities,
			validity_end     : format(dateRangePickerValue.endDate),
			validity_start   : format(dateRangePickerValue.startDate),
			currency         : filteredCurrency,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
						//  eslint-disable-next-line max-len
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/3973480 1.svg"
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
