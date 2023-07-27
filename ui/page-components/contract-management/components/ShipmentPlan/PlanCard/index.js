import { cl, Modal } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import InitiateBooking from '../../../common/InitiateBooking';
import RequestBooking from '../../../common/RequestBooking';
import useGetContractShipmentData from '../../../hooks/useGetContractShipmentData';
import { RD_STATUS_MAPPING } from '../constants';

import Actions from './Actions';
import CreatePlanBox from './CreatePlanBox';
import CreatePlanModal from './CreatePlanModal';
import DetailedBreakUp from './DetailedBreakUp';
import Freight from './Freight';
import ManualShipmentCard from './ManualShipmentCard';
import Route from './Route';
import ShipmentCard from './ShipmentCard';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';
import Validity from './Validity';

import { useRouter } from '@/packages/next';

const serviceState = 'APPROVAL PENDING';

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
	const { id: serviceId = '', status } = primaryServiceDetail || {};

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
		requestData = [],
	} = useGetContractShipmentData({ isExistingManual });

	const { shipment_data: shipmentData = [], plan_data = [] } = shipmentPlanData || {};
	const isPlanAbsent = isEmpty(shipmentData);
	const planNotAvailable = isEmpty(plan_data);

	const serviceStateWithQuery = contract_status === 'expired' ? contract_status : RD_STATUS_MAPPING[status];

	const utilisationCountExceed = Number(KEYS_MAPPING[service_type]?.booked)
		> Number(KEYS_MAPPING[service_type]?.req);

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
					isPlanAbsent={isPlanAbsent}
					contract_type={contract_type}
					contractStatus={contractStatus}
					setShowModal={setShowModal}
					setShowPlanBox={setShowPlanBox}
					getShipmentPlans={getShipmentPlans}
					setShowBookingModal={setShowBookingModal}
					setShowBreakup={setShowBreakup}
					utilisationCountExceed={utilisationCountExceed}
					primaryServicesDetails={primaryServicesDetails}
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

			{showPlanBox && isPlanAbsent && source !== 'manual' && (
				<CreatePlanBox setShowModal={setShowModal} loading={loading} />
			)}

			{!isPlanAbsent && showPlanBox && source !== 'manual' && (
				<ShipmentCard
					shipmentData={shipmentData}
					loading={loading}
					itemData={itemData}
				/>
			)}

			{showPlanBox && source === 'manual' && (
				<ManualShipmentCard
					requestData={requestData}
					loading={loading}
					itemData={itemData}
				/>
			)}

			{showModal && (
				<CreatePlanModal
					itemData={itemData}
					plan_data={plan_data}
					showModal={showModal}
					isEditPlan={!planNotAvailable}
					setShowModal={setShowModal}
					getShipmentPlans={getShipmentPlans}
					getServiceDetails={getServiceDetails}
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
