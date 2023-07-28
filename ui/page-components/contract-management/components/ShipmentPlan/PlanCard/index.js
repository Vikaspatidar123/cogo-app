import { cl, Modal } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import InitiateBooking from '../../../common/InitiateBooking';
import RequestBooking from '../../../common/RequestBooking';
import useGetContractShipmentData from '../../../hooks/useGetContractShipmentData';
import getCommodityName from '../../../utils/getCommodityName';
import { RD_STATUS_MAPPING } from '../constants';

import Actions from './Actions';
import CreatePlanBox from './CreatePlanBox';
import CreatePlanModal from './CreatePlanModal';
import DetailedBreakUp from './DetailedBreakUp';
import Freight from './Freight';
import Route from './Route';
import ShipmentCard from './ShipmentCard';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';
import Validity from './Validity';

import { useRouter } from '@/packages/next';

const serviceState = 'APPROVAL PENDING';

const formatPlanData = ({ plan_data: data, containerDetailsMapping }) => {
	const groupedData = data.reduce((accumulator, entry) => {
		const { validity_start, validity_end } = entry;
		const key = `${validity_start}_${validity_end}`;

		return {
			...accumulator,
			[key]: [...(accumulator[key] || []), entry],
		};
	}, {});

	const modifiedGroupedData = Object.entries(groupedData).reduce(
		(accumulator, [key, entry]) => {
			const [validity_start, validity_end] = key.split('_');

			return {
				...accumulator,
				create_plan: [
					...accumulator.create_plan,
					{
						date_range: {
							startDate : new Date(validity_start),
							endDate   : new Date(validity_end),
						},
						sub_create_plan: entry.reduce((acc, curr) => {
							const { contract_service_id, max_count, id } = curr;

							return [
								...acc,
								{
									max_count,
									vessel_select : containerDetailsMapping[contract_service_id],
									id            : id || undefined,
								},
							];
						}, []),
					},
				],
			};
		},
		{ create_plan: [] },
	);

	return modifiedGroupedData;
};

const getKeysMapping = ({ itemData = {} }) => {
	const {
		max_containers_count = 0,
		booked_containers_count = 0,
		booked_volume = 0,
		max_volume = 0,
		max_weight = 0,
		booked_weight = 0,
	} = itemData || {};

	return ({
		fcl_freight: {
			req    : max_containers_count,
			booked : booked_containers_count || 0,
		},
		lcl_freight: {
			req    : max_volume,
			booked : booked_volume || 0,
		},
		air_freight: {
			req    : max_weight,
			booked : booked_weight || 0,
		},
	});
};

function PlanCard({
	itemData = {},
	getServiceDetails = () => { },
	contractData = {},
}) {
	const {
		status: contractStatus = '',
		source = '',
		contract_type = '',
		importer_exporter_id = '',
		importer_exporter = {},
		validity_start_date = '',
		validity_end_date = '',
		id: contractId = '',
	} = contractData || {};

	const {
		destination_port = {},
		origin_port = {},
		destination_main_port = {},
		origin_main_port = {},
		destination_airport = {},
		origin_airport = {},
		upcoming_shipment_data = {},
		service_type = '',
		id = '',
		additional_services = [],
		price_breakup = [],
		convenience_rate = {},
		[`${service_type}_services`]: freightDetails = [],
		validity_end = '',
		validity_left_days = '',
		validity_start = '',
	} = itemData || {};

	const { query } = useRouter();
	const { contract_status = '' } = query || {};

	const [showModal, setShowModal] = useState(false);
	const [showPlanBox, setShowPlanBox] = useState(false);
	const [showBookingModal, setShowBookingModal] = useState(false);
	const [open, setOpen] = useState(false);
	const [showBreakup, setShowBreakup] = useState(false);
	const [showDetailedBreakUpdate, setShowDetailedBreakUpdate] = useState(true);

	const KEYS_MAPPING = getKeysMapping({ itemData });

	const added_additional_services = [];
	const primaryServicesDetails = [];

	freightDetails.forEach((mainService) => {
		const { additional_services: newAdditionalServices = [], service_details = [] } = mainService;
		newAdditionalServices.forEach((service) => {
			added_additional_services.push(service);
		});

		service_details.forEach((detail) => {
			if (detail.service_type === service_type) {
				const mergedDetail = { ...detail, primary_service_id: mainService.id };
				primaryServicesDetails.push(mergedDetail);
			}
		});
	});

	const primaryServiceDetail = freightDetails.find(
		(detail) => detail.is_primary_service,
	);

	const {
		id: serviceId = '',
		status,
		[`contract_${service_type}_location_detail_id`]: serviceLocationId = '',
	} = primaryServiceDetail;

	const bookingData = {
		service_type,
		upcoming_shipment_data,
		additional_services,
		contractEndDate   : validity_end_date,
		contractStartDate : validity_start_date,
		source,
		contract_type,
	};

	const isExistingManual = source === 'manual' && contract_type === 'with_carrier';

	const {
		loading,
		shipmentPlanData = {},
		getShipmentPlans = () => { },
	} = useGetContractShipmentData({ isExistingManual, serviceLocationId });

	const { shipment_data: shipmentData = [], plan_data = [] } = shipmentPlanData || {};

	const canEditPlan = !isEmpty(plan_data);

	const serviceStateWithQuery = contract_status === 'expired' ? contract_status : RD_STATUS_MAPPING[status];

	const utilisationCountExceed = Number(KEYS_MAPPING[service_type]?.booked)
		> Number(KEYS_MAPPING[service_type]?.req);

	const { containerDetailsOptions, containerDetails } = freightDetails.reduce(
		(acc, item) => {
			const {
				container_size,
				container_type,
				commodity,
				id: dataServiceId,
				service_type: serviceType = '',
			} = item;

			const labelMapping = {
				fcl_freight: `${container_size} ft (${startCase(
					container_type,
				)}) (${getCommodityName(commodity)})`,
				lcl_freight : `${getCommodityName(commodity)}`,
				air_freight : `${getCommodityName(commodity)}`,
			};

			return {
				...acc,
				containerDetailsOptions: [
					...acc.containerDetailsOptions,
					{
						label : labelMapping[serviceType],
						value : `${container_size}_${dataServiceId}`,
					},
				],
				containerDetails: {
					...acc.containerDetails,
					[dataServiceId]: {
						container_size : `${container_size} ft`,
						container_type : startCase(container_type),
						commodity      : getCommodityName(commodity),
					},
				},
			};
		},
		{ containerDetailsOptions: [], containerDetails: {} },
	);

	const containerDetailsMapping = containerDetailsOptions.reduce(
		(acc, item) => {
			const { value } = item;
			return { ...acc, [value.split('_')[1]]: value };
		},
		{},
	);

	const modifiedGroupedData = formatPlanData({
		plan_data,
		containerDetailsMapping,
	});

	return (
		<div className={cl`${styles.container} ${status === '' ? styles.add_padding : ''}`}>
			<div className={styles.flex_box}>
				{status ? (
					<div className={cl`${styles.status_tag} ${styles[`${status}_${contractStatus}`]}`}>
						{contractStatus === 'active' ? serviceStateWithQuery : serviceState}
					</div>
				) : null}

				<Validity
					validity_left_days={validity_left_days}
					validity_end={validity_end}
					validity_start={validity_start}
					contractStatus={contractStatus}
				/>
			</div>

			<div className={cl`${styles.section} ${styles.section_one}`}>
				<div className={styles.port_pairs}>
					<Route
						destinationPort={destination_port}
						originPort={origin_port}
						destinationAirport={destination_airport}
						originAirport={origin_airport}
						serviceType={service_type}
						destination_main_port={destination_main_port}
						origin_main_port={origin_main_port}
					/>
				</div>
				<Freight
					itemData={itemData}
					showBreakup={showBreakup}
					setShowBreakup={setShowBreakup}
					setShowPlanBox={setShowPlanBox}
					freightDetails={freightDetails}
				/>
			</div>

			<div className={styles.section}>
				{!isEmpty(upcoming_shipment_data) && (
					<ShipmentInfo
						serviceType={service_type}
						upcomingShipmentData={upcoming_shipment_data}
					/>
				)}
			</div>

			<div className={cl`${styles.section} ${styles.section_three}`}>
				<div
					className={styles.text}
					role="presentation"
					onClick={() => setShowDetailedBreakUpdate((prev) => !prev)}
				>
					{showDetailedBreakUpdate ? 'Hide' : 'View'}
					{' '}
					Detailed BreakUp
					{' '}
					{showDetailedBreakUpdate ? (
						<IcMArrowUp height={20} width={20} />
					) : (
						<IcMArrowDown height={20} width={20} />
					)}
				</div>

				<Actions
					serviceId={serviceId}
					status={status}
					source={source}
					setOpen={setOpen}
					planData={plan_data}
					serviceType={service_type}
					showPlanBox={showPlanBox}
					shipmentData={shipmentData}
					contract_type={contract_type}
					contractStatus={contractStatus}
					setShowModal={setShowModal}
					setShowPlanBox={setShowPlanBox}
					getShipmentPlans={getShipmentPlans}
					setShowBookingModal={setShowBookingModal}
					setShowBreakup={setShowBreakup}
					utilisationCountExceed={utilisationCountExceed}
					primaryServicesDetails={primaryServicesDetails}
					setShowDetailedBreakUpdate={setShowDetailedBreakUpdate}
				/>
			</div>

			{showDetailedBreakUpdate ? (
				<DetailedBreakUp
					freightDetails={freightDetails}
					details={price_breakup}
					source={source}
					setShowBreakup={setShowBreakup}
					convenienceRate={convenience_rate}
				/>
			) : null}

			{showPlanBox && isEmpty(shipmentData) && (
				<CreatePlanBox setShowModal={setShowModal} loading={loading} />
			)}

			{!isEmpty(shipmentData) && showPlanBox && (
				<ShipmentCard
					shipmentData={shipmentData}
					loading={loading}
					itemData={itemData}
					containerDetails={containerDetails}
				/>
			)}

			{showModal && (
				<CreatePlanModal
					itemData={itemData}
					plan_data={plan_data}
					showModal={showModal}
					isEditPlan={canEditPlan}
					setShowModal={setShowModal}
					getShipmentPlans={getShipmentPlans}
					getServiceDetails={getServiceDetails}
					modifiedGroupedData={modifiedGroupedData}
					containerDetailsOptions={containerDetailsOptions}
				/>
			)}

			{showBookingModal && (
				<InitiateBooking
					data={bookingData}
					primaryServicesDetails={primaryServicesDetails}
					setShowBookingModal={setShowBookingModal}
					showBookingModal={showBookingModal}
					contractId={contractId}
					added_additional_services={added_additional_services}
				/>
			)}

			{open && (
				<Modal
					show={open}
					onClose={() => setOpen(false)}
					onOuterClick={() => setOpen(false)}
					size="xl"
					placement="top"
				>
					<RequestBooking
						serviceId={id}
						setOpen={setOpen}
						originPortData={origin_port}
						destinationPortData={destination_port}
						service_type={service_type}
						importer_exporter_id={importer_exporter_id}
						org_name={importer_exporter?.[importer_exporter_id]?.business_name}
					/>
				</Modal>
			)}

		</div>
	);
}

export default PlanCard;
