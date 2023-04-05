import { Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useMemo } from 'react';

import handleLiveChat from '../helpers/handle-live-chat';
import triggerAnalytics from '../helpers/triggerAnalytics';
import useGetEnquiryQuota from '../hooks/useGetEnquiryQuota';
import useGetSchedules from '../hooks/useGetSchedules';
import isServicableCountry from '../utils/isServicableCountry';
import swbAllowedServices from '../utils/swb-allowed-services';
// import EnquiryCard from './EnquiryCard';

import AdditionalServices from './AdditionalServices';
import AddRate from './AddRate';
import CogoAssuredList from './CogoAssuredList';
import ContractAd from './ContractAd';
import ContractIntelligence from './ContractIntelligence';
import GoBackToShipment from './GoBack';
import Header from './Header';
import Info from './Info';
import CargoInsuranceInfo from './Info/CargoInsuranceInfo';
import FtlInfo from './Info/FtlInfo';
import TrailerFreightInfo from './Info/TrailerFreightInfo';
import Loader from './Loader';
import NoResultFound from './NoResultFound';
import OrganizationDetails from './OrganizationDetails';
import RateCards from './RateCards';
import RequestRate from './RequestRate';
import SellRate from './SellRate';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryDetails from '@/ui/commons/utils/getCountryDetails';

const SwitchUsers = dynamic(() => import('./SwitchUsers'), { ssr: false });
const EnquriyStatus = dynamic(() => import('./AdditionalCards/EnquriyStatus'), {
	ssr: false,
});
// const AlternativeRates = dynamic(() => import('./AlternativeRates'), {
// 	ssr: false,
// });
// const Header = dynamic(() => import('./Header'), { ssr: false });

const REQUEST_RATE_ALLOWED_SERVICES = [
	'fcl_freight',
	'lcl_freight',
	'air_freight',
	'ftl_freight',
	'ltl_freight',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'haulage_freight',
	'fcl_freight_local',
	'rail_domestic_freight',
	'trailer_freight',
];

const INDIA_COUNTRY_ID = GLOBAL_CONSTANTS.country_ids.IN;

function SelectedRateInfo({
	data,
	loading,
	searchData,
	importer_exporter_details,
	setShowEdit,
	refetch,
	possible_additional_services,
	detail,
}) {
	const {
		general: { isMobile },
	} = useSelector((reduxState) => reduxState);

	const [open, setOpen] = useState(false);

	const SERVICE_TYPE_SELECTED_RATE_COMPONENT_MAPPING = useMemo(
		() => ({
			ftl_freight           : FtlInfo,
			ltl_freight           : FtlInfo,
			trailer_freight       : TrailerFreightInfo,
			rail_domestic_freight : TrailerFreightInfo,
			cargo_insurance       : CargoInsuranceInfo,
			others                : Info,
		}),
		[],
	);

	const { service_type } = data || {};

	const componentKey = service_type in SERVICE_TYPE_SELECTED_RATE_COMPONENT_MAPPING ? service_type : 'others';
	const Component = SERVICE_TYPE_SELECTED_RATE_COMPONENT_MAPPING[componentKey] || null;

	if (!Component) {
		return null;
	}
	return (
		<Component
			key={service_type}
			data={data}
			isMobile={isMobile}
			open={open}
			setOpen={setOpen}
			loading={loading}
			searchData={searchData}
			importer_exporter_details={importer_exporter_details}
			setShowEdit={setShowEdit}
			refetch={refetch}
			possible_additional_services={possible_additional_services}
			{...(componentKey === 'others' && { detail })}
		/>
	);
}

function Results({
	data = {},
	setState = () => {},
	state,
	rates = [],
	searchData = {},
	loading = false,
	possible_additional_services = [],
	refetch = () => {},
	...rest
}) {
	const { replace, back } = useRouter();
	const enquiryQuota = useGetEnquiryQuota();

	const { detail = {}, contract_detail = {} } = searchData;
	const { importer_exporter_id: importerExporterId = '' } = detail || {};
	const { count = 0 } = contract_detail || {};

	const { scope, isMobile, query, user_profile } = useSelector(
		({ general, profile }) => ({
			isMobile     : (general || {}).isMobile,
			scope        : general?.scope,
			query        : (general || {}).query || {},
			user_profile : profile,
		}),
	);
	const { search_id, shipment_id } = query;

	const { setSort, sort, filters, setFilters } = rest || {};

	const {
		shipment_id: shipment_id_search,
		expired,
		negotiation_status,
	} = data || {};

	const [addRate, setAddRate] = useState(false);
	const [wayToBook, setWayToBook] = useState('sell_without_buy');

	const [showEdit, setShowEdit] = useState(false);
	const [importer_exporter_details, setImporterExporterDetails] = useState({
		id        : data?.importer_exporter_id || data?.importer_exporter?.id,
		name      : data?.importer_exporter?.business_name,
		branch_id : data?.importer_exporter_branch_id,
		user_id   : data?.user_id,
	});
	useEffect(() => {
		if (data && data?.search_type) {
			triggerAnalytics(data, data?.importer_exporter);
		}
		if (data) {
			setImporterExporterDetails({
				id        : data?.importer_exporter_id || data?.importer_exporter?.id,
				name      : data?.importer_exporter?.business_name,
				branch_id : data?.importer_exporter_branch_id,
				user_id   : data?.user_id,
			});
		}
	}, [JSON.stringify(data), scope]);

	useEffect(() => {
		if (search_id) {
			refetch(true);
			setAddRate(false);
		}
	}, [search_id]);

	useEffect(() => {
		if (shipment_id_search) {
			// Handled case when shipment is already created for this search
			replace('/book');
		}
	}, [shipment_id_search]);

	useEffect(() => {
		if (expired) {
			// Handled case when search is expired
			replace('/book');
		}
	}, [expired]);

	useEffect(() => {
		const isHiPriority = data?.origin_country?.country_code === 'CN'
      && data?.destination_country?.country_code
        === getCountryDetails({ country_id: INDIA_COUNTRY_ID }).country_code;
		if (!loading && isHiPriority && process.env.LIVE_CHAT_CLIENT_ID) {
			handleLiveChat(user_profile, data, scope);
		}
		return () => {
			const LCW = window.LiveChatWidget;
			if (LCW) {
				LCW.call('destroy');
			}
		};
	}, [loading]);

	const isAwaitingResponse = negotiation_status === 'awaiting_responses';
	const isCompletedResponse = negotiation_status === 'completed';
	const rates_count = (rates || []).length;
	const cogoAssuredRates = [];
	const marketplaceRates = [];
	rates.forEach((rate) => {
		if (rate.source === 'cogo_assured_rate') {
			cogoAssuredRates.push(rate);
		} else {
			marketplaceRates.push(rate);
		}
	});
	// const isOrgCP = ((data?.importer_exporter || {}).tags || []).includes(
	// 	'partner',
	// );

	// const showEnquiry =
	// 	data?.importer_exporter?.id !== COGO_DEMO_ACCOUNT_SHIPPER &&
	// 	!isOrgCP;

	const noResultsType = () => {
		let type = '';
		if (!isServicableCountry(data)) {
			type = 'no_servicable_country';
		} else if (rates_count === 0) {
			type = 'no_result_found';
		}
		return type;
	};

	const { swb_with_rates, swb_without_rates } = swbAllowedServices({
		search_type : data?.search_type,
		trade_type  : detail?.trade_type,
		source      : detail?.source,
		rates,
	});

	const { scheduleList = [] } = useGetSchedules();

	const handleRateCards = () => {
		if (loading) {
			return (
				<>
					<Loader />
					<Loader />
					<Loader />
				</>
			);
		}

		if (!loading && rates_count === 0 && !isAwaitingResponse) {
			return (
				<NoResultFound
					id={search_id}
					type={noResultsType()}
					headerData={data}
					refetch={refetch}
					enquiryQuota={enquiryQuota}
					data={data?.importer_exporter}
				/>
			);
		}
		if (!loading && rates_count.length === 0 && !isAwaitingResponse) {
			return (
				<>
					{swb_without_rates ? <AddRate setAddRate={setAddRate} /> : null}

					{REQUEST_RATE_ALLOWED_SERVICES.includes(data?.search_type) ? (
						<RequestRate headerData={data} />
					) : null}
				</>
			);
		}

		const flag = rates_count > 0 || isCompletedResponse || isAwaitingResponse;
		if (!flag) {
			return null;
		}

		return (
			<>
				{isCompletedResponse || isAwaitingResponse ? (
					<EnquriyStatus
						data={data}
						refetch={refetch}
						enquiryQuota={enquiryQuota}
					/>
				) : null}
				{cogoAssuredRates.length > 0 ? (
					<CogoAssuredList
						list={cogoAssuredRates}
						searchData={searchData}
						details={data}
					/>
				) : null}
				{(marketplaceRates || []).map((item, i) => (
					<>
						<RateCards
							setState={setState}
							state={state}
							data={item}
							details={data}
							refetch={refetch}
							searchData={searchData}
							index={i}
							scheduleList={scheduleList}
						/>

						{(marketplaceRates === 1 ? i === 0 : i % 10 === 1)
            && swb_with_rates ? (
	<AddRate
		type="rates-found"
		setAddRate={setAddRate}
		show={false}
	/>
            	) : null}
					</>
				))}
			</>
		);
	};

	const handleAdditionalServices = () => {
		if (isMobile || loading) {
			return null;
		}

		return (
			<div className={styles.left_section}>
				<AdditionalServices
					data={data}
					refetch={refetch}
					possible_additional_services={possible_additional_services}
				/>
				{rates_count > 0 && count < 1 && <ContractIntelligence />}
			</div>
		);

		// if (
		// 	['air_freight', 'lcl_freight', 'fcl_freight'].includes(data?.search_type)
		// ) {
		// 	return (
		// 		<AlternativeRates
		// 			search_type={data?.search_type}
		// 			data={data}
		// 			search_id={search_id}
		// 			importer_exporter_id={data?.importer_exporter_id}
		// 		/>
		// 	);
		// }
		// return null;
	};

	const configureSellRate = () => (
		<SellRate
			rates={rates}
			setWayToBook={setWayToBook}
			wayToBook={wayToBook}
			data={data}
			searchData={searchData}
			setAddRate={setAddRate}
		/>
	);

	return (
		<div className={styles.container}>
			<div className={styles.header_wrap}>
				<div className={styles.flex}>
					{shipment_id ? (
						<GoBackToShipment />
					) : (
						<>
							<div
								role="presentation"
								className={styles.hover_effect}
								onClick={() => replace('/book')}
							>
								<IcMArrowBack style={{ width: 20, height: 20 }} />
							</div>
							<text className={styles.link}>Back to Discover Rates</text>
						</>
					)}
				</div>
			</div>

			<div className={styles.flex}>
				<div className={styles.flex_div}>
					<SelectedRateInfo
						data={data}
						loading={loading}
						searchData={searchData}
						importer_exporter_details={importer_exporter_details}
						setShowEdit={setShowEdit}
						refetch={refetch}
						possible_additional_services={possible_additional_services}
						detail={detail}
					/>

					{rates_count > 0 && (
						<ContractAd
							loading={loading}
							contractDetail={contract_detail}
							importerExporterId={importerExporterId}
						/>
					)}
					{!addRate ? (
						<>
							<div className={styles.results_header}>
								{!loading ? (
									<div className={styles.text_bold}>
										{`${(rates || []).length} ${
											(rates || []).length === 1 ? 'rate' : 'rates'
										} found`}
									</div>
								) : (
									<Placeholder />
								)}

								{!loading ? (
									<Header
										search_type={data?.search_type}
										refetch={refetch}
										setSort={setSort}
										sortBy={sort}
										filters={filters}
										setFilters={setFilters}
										detail={data}
										state={state}
										isMobile={isMobile}
									/>
								) : null}
							</div>

							{handleRateCards()}
						</>
					) : (configureSellRate())}
				</div>

				{handleAdditionalServices()}
			</div>
		</div>
	);
}

export default Results;
