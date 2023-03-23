import { Modal } from '@cogoport/components';
import { format, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

// import InitiateBookingModal from '../../../common/InitiateBooking';
// import RequestBookingModal from '../../../common/RequestBooking';
import InitiateBooking from '../../../common/InitiateBooking';
import RequestBooking from '../../../common/RequestBooking';
import useGetContractShipmentData from '../../../hooks/useGetContractShipmentData';
import { RD_STATUS_MAPPING } from '../constants';
import PriceBreakup from '../PriceBreakup';

import Actions from './Actions';
import Commodities from './Commodities';
import CreatePlanBox from './CreatePlanBox';
import CreatePlanModal from './CreatePlanModal';
import Freight from './Freight';
import ManualShipmentCard from './ManualShipmentCard';
import Route from './Route';
import ShipmentCard from './ShipmentCard';
import ShipmentInfo from './ShipmentInfo';
import ShipmentState from './ShipmentState';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function PlanCard({
	itemData = {},
	getServiceDetails = () => {},
	contractData = {},
}) {
	const [showModal, setShowModal] = useState(false);
	const [showPlanBox, setShowPlanBox] = useState(false);
	const [showBookingModal, setShowBookingModal] = useState(false);
	const [open, setOpen] = useState(false);
	const [showBreakup, setShowBreakup] = useState(false);

	const {
		general: { isMobile = false, scope = '', query = {} },
	} = useSelector((state) => state);

	const { contract_status = '' } = query || {};
	const {
		status: contractStatus = '',
		source = '',
		contract_type = '',
		importer_exporter_id = '',
		importer_exporter = {},
		validity_start_date = '',
		validity_end_date = '',
	} = contractData || {};

	const {
		destination_port = {},
		origin_port = {},
		destination_airport = {},
		origin_airport = {},
		upcoming_shipment_data = {},
		service_type = '',
		id = '',
		status = '',
		additional_services = [],
		price_breakup = [],
		max_containers_count = 0,
		booked_containers_count = 0,
		booked_volume = 0,
		max_volume = 0,
		max_weight = 0,
		booked_weight = 0,
	} = itemData || {};

	const bookingData = {
		service_type,
		upcoming_shipment_data,
		additional_services,
		service_id        : id,
		contractEndDate   : validity_end_date,
		contractStartDate : validity_start_date,
		source,
		contract_type,
	};
	const readyForBooking = validity_start_date < format(new Date());

	const isExistingManual =		source === 'manual' && contract_type === 'with_carrier';

	const {
		loading,
		shipmentPlanData = [],
		getShipmentPlans = () => {},
		requestData = [],
	} = useGetContractShipmentData({ isExistingManual });

	const { shipment_data: shipmentData = [], plan_data = [] } =		shipmentPlanData || {};
	const isPlanAbsent = isEmpty(shipmentData);
	const planNotAvailable = isEmpty(plan_data);

	const serviceState =		scope === 'app' ? 'APPROVAL PENDING' : 'Approval Pending from RD';
	const serviceStateWithQuery =		contract_status === 'expired' ? contract_status : RD_STATUS_MAPPING[status];

	const KEYS_MAPPING = {
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
	};

	const utilisationCountExceed =		Number(KEYS_MAPPING[service_type]?.booked)
		> Number(KEYS_MAPPING[service_type]?.req);

	return (
		<div className={styles.container}>
			{status && (
				<div className={`${styles.status_tag} ${styles.status}_${styles.contractStatus}`}>
					{contractStatus === 'active' ? serviceStateWithQuery : serviceState}
				</div>
			)}
			<div className={`${styles.section} ${styles.section_one}`}>
				<div className={styles.port_pairs}>
					<Route
						destinationPort={destination_port}
						originPort={origin_port}
						destinationAirport={destination_airport}
						originAirport={origin_airport}
						serviceType={service_type}
					/>
				</div>
				<Freight
					itemData={itemData}
					showBreakup={showBreakup}
					setShowBreakup={setShowBreakup}
					setShowPlanBox={setShowPlanBox}
				/>
			</div>
			<div className={styles.section}>
				<Commodities itemData={itemData} />
				{!isEmpty(upcoming_shipment_data) && (
					<ShipmentInfo
						serviceType={service_type}
						upcomingShipmentData={upcoming_shipment_data}
					/>
				)}
			</div>
			<div className={`${styles.section} ${styles.section_three}`}>
				<ShipmentState itemData={itemData} />
				<Actions
					serviceId={id}
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
				/>
			</div>

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
					portData={itemData}
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
					setShowBookingModal={setShowBookingModal}
					showBookingModal={showBookingModal}
					readyForBooking={readyForBooking}
				/>
			)}

			{open && (
				<Modal
					show={open}
					className={`primary ${isMobile ? '' : 'xl'}`}
					onClose={() => setOpen(false)}
					fullscreen={isMobile}
					onOuterClick={() => setOpen(false)}
					styles={{ dialog: { overflow: 'visible' } }}
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

			{showBreakup && (
				<PriceBreakup
					details={price_breakup}
					setShowBreakup={setShowBreakup}
					source={source}
				/>
			)}
		</div>
	);
}

export default PlanCard;
