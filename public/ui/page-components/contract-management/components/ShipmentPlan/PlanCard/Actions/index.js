import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Actions({
	showPlanBox,
	planData = [],
	serviceId = '',
	serviceType = '',
	status = '',
	contractStatus = '',
	source = '',
	contract_type = '',
	setOpen = () => {},
	setShowPlanBox = () => {},
	setShowModal = () => {},
	setShowBookingModal = () => {},
	getShipmentPlans = () => {},
	setShowDetailedBreakUpdate = () => {},
	shipmentData = [],

}) {
	const { query } = useRouter();
	const { through = '', contract_status = '' } = query || {};

	const disableInitiateBooking =		status !== 'locked'
		|| contractStatus !== 'active'
		|| through === 'techops'
		|| contract_status === 'expired';

	const isExistingCarrierManual =		source === 'manual'
		&& contract_type === 'with_carrier'
		&& serviceType === 'fcl_freight';

	const isManualCarrierContract =		source === 'manual'
		&& contract_type === 'with_carrier'
		&& contract_status !== 'expired';

	const showCreateEditPlanBtn =		!isEmpty(shipmentData) && showPlanBox && contract_status !== 'expired';

	const viewShipmentPlan = () => {
		setShowDetailedBreakUpdate(false);
		setShowPlanBox(!showPlanBox);
		if (!showPlanBox) {
			getShipmentPlans(serviceId, serviceType);
		}
	};

	return (
		<div className={styles.container}>
			{!isExistingCarrierManual && (
				<>
					{showCreateEditPlanBtn && (
						<div
							role="presentation"
							className={styles.edit_btn}
							onClick={() => setShowModal(true)}
						>
							{isEmpty(planData) ? 'Create Plan' : 'Edit Plan'}
						</div>
					)}

					{status !== 'rejected' && (
						<Button themeType="secondary" type="button" onClick={viewShipmentPlan}>
							{showPlanBox ? 'Hide' : 'Shipment'}
							{' '}
							Plan
						</Button>
					)}
				</>
			)}

			{isManualCarrierContract ? (
				<>
					<Button
						themeType="secondary"
						onClick={viewShipmentPlan}
						style={{ marginRight: '20px' }}
						type="button"
					>
						{showPlanBox ? 'Hide' : 'View'}
						Requested
					</Button>
					<Button
						onClick={() => {
							setOpen(true);
						}}
						disabled={disableInitiateBooking}
						size="md"
						themeType="accent"
						type="button"
					>
						Request Booking
					</Button>
				</>
			)
				: (
					<Button
						onClick={() => setShowBookingModal(true)}
						disabled={disableInitiateBooking}
						style={{ marginLeft: '10px' }}
						themeType="accent"
						type="button"
					>
						Initiate Booking
					</Button>
				)}
		</div>
	);
}

export default Actions;
