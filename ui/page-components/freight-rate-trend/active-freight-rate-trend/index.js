import { Button, Popover, Placeholder } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import FilterForm from './components/filter';
import TrendChart from './components/trend-chart';
import useFetchActiveTrend from './hooks/useActivetrendsDetails';
import useFetchTrendDetails from './hooks/useFetchTrendDetails';
import styles from './styles.module.css';

import { useRouter, Image } from '@/packages/next';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import countriesHash from '@/ui/commons/utils/getCountryDetails';

const CURRRENT_MONTH = new Date().getMonth();

function RenderSkeleton() {
	return (
		<div className={styles.card}>
			<Placeholder height="370px" width="1250px" margin="0px 0px 20px 0px" />
		</div>
	);
}

function ActiveFreightRateTrend() {
	const { back, query } = useRouter();
	const id = query.trend_id;
	const { t } = useTranslation(['frt']);
	const { organization } = useSelector((state) => state.profile);

	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [commodities, setCommodities] = useState('general');
	const [dateRangePickerValue, setDateRangePickerValue] = useState({
		startDate : new Date(new Date().setMonth(CURRRENT_MONTH - 6)),
		endDate   : new Date(new Date().setMonth(CURRRENT_MONTH + 1)),
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
	const currency = countriesHash[organization.country_id]?.currency_code;

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
				<div className={styles.heading}>{t('frt:trend_chart_title')}</div>
				<TrendChart
					labels={labels || []}
					datasets={datasets || []}
					currency={currency}
					filteredCurrency={filteredCurrency}
					loading={loading}
				/>
			</>
		) : (
			<div className={styles.empty_state}>
				<Image
					width={460}
					height={460}
					src={GLOBAL_CONSTANTS.image_url.empty_state}
					alt="No data"
				/>
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
			</div>

			<div className={styles.container}>{loading ? <RenderSkeleton /> : Graph()}</div>
			<div className={styles.filter_mobile_view}>
				<Button variant="secondary" size="sm" onClick={handleFilterModal}>
					{t('frt:filter')}
				</Button>
			</div>

		</>
	);
}

export default ActiveFreightRateTrend;
