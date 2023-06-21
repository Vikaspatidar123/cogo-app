import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Actions({
	showPlanBox,
	isPlanAbsent = false,
	planData = [],
	serviceId = '',
	serviceType = '',
	status = '',
	contractStatus = '',
	source = '',
	contract_type = '',
	setOpen = () => { },
	setShowPlanBox = () => { },
	setShowModal = () => { },
	setShowBookingModal = () => { },
	getShipmentPlans = () => { },
	setShowBreakup = () => { },
	utilisationCountExceed,
}) {
	const { query } = useRouter();
	const { through = '', contract_status = '' } = query || {};
	const disabledBooking = status !== 'locked' || contractStatus !== 'active' || through === 'techops';

	const isExistingManual = (source === 'manual'
		&& contract_type === 'with_carrier'
		&& serviceType === 'fcl_freight')
		|| (source === 'manual' && contract_type === 'with_cogoport');

	const viewShipmentPlan = () => {
		setShowBreakup(false);
		setShowPlanBox(!showPlanBox);
		if (!showPlanBox) {
			getShipmentPlans(serviceId, serviceType);
		}
	};
	const showCreateUpdateBtn = !isPlanAbsent && showPlanBox && contract_status !== 'expired';

	const withShippingLineContract = source === 'manual'
		&& contract_type === 'with_carrier'
		&& contract_status !== 'expired';

	return (
		<div className={styles.container}>
			{!isExistingManual && (
				<>
					{showCreateUpdateBtn && !isEmpty(planData) && (
						<div
							role="presentation"
							className={styles.edit_btn}
							onClick={() => setShowModal(true)}
						>
							Edit Plan
						</div>
					)}

					{showCreateUpdateBtn
						&& isEmpty(planData)
						&& !utilisationCountExceed && (
							<div
								role="presentation"
								className={styles.edit_btn}
								onClick={() => setShowModal(true)}
							>
								Create Plan
							</div>
						)}
					{status !== 'rejected' && (
						<Button themeType="secondary" onClick={viewShipmentPlan}>
							{showPlanBox ? 'Hide' : 'Shipment'}
							{' '}
							Plan
						</Button>
					)}
				</>
			)}

			{withShippingLineContract && (
				<>
					<Button themeType="secondary" onClick={viewShipmentPlan} style={{ marginLeft: '10px' }}>
						{showPlanBox ? 'Hide' : 'View'}
						Requested
					</Button>
					<Button
						onClick={() => {
							setOpen(true);
						}}
						disabled={disabledBooking}
					>
						Request Booking
					</Button>
				</>
			)}

			{!withShippingLineContract && (
				<Button
					onClick={() => setShowBookingModal(true)}
					disabled={disabledBooking}
					style={{ marginLeft: '10px' }}
					themeType="accent"
				>
					Initiate Booking
				</Button>
			)}
		</div>
	);
}

export default Actions;
