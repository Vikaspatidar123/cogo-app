import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useContext, useState } from 'react';

import { ShipmentDetailContext } from '../../../../common/Context';

import RequestCancellation from './RequestCancellation';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

const showCancellationStakeholders = [
	'booking_agent',
	'sales_agent',
	'superadmin',
	'admin',
	'service_ops1',
	'tech_ops',
	'user',
];
const serviceCancellationStates = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
	'cancelled',
];

const domesticServiceCancellationStates = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
	'cancelled',
	'cargo_handed_over_at_origin',
];

const shipmentCancellationStates = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

function Cancellation({
	isIE = false,
	showRequest = false,
	refetch = () => {},
	isRequested,
}) {
	const { email } = useSelector(({ profile }) => ({
		email: profile.email,
	}));

	const [show, setShow] = useState(false);
	const [showCancel, setShowCancel] = useState(false || showRequest);

	const [contextValues] = useContext(ShipmentDetailContext);
	const { shipment_data, primary_service } = contextValues || {};

	const { state, stakeholder_types, shipment_type } = shipment_data || {};

	const tradePartyType = shipment_data?.trade_party_type;

	const tradeType = shipment_data?.all_services
		?.filter((item) => item?.service_type === primary_service?.service_type)?.[0]?.trade_type;

	const is_end_to_end = shipment_data?.is_end_to_end;

	const showToStakeholders = stakeholder_types?.some((ele) => showCancellationStakeholders?.includes(ele));

	const isServiceCancellable =		shipment_type === 'domestic_air_freight'
		? domesticServiceCancellationStates
		: serviceCancellationStates.includes(primary_service?.state);

	const isShipmentCancellable = shipmentCancellationStates.includes(state);

	const showCancelButton =		isShipmentCancellable
		&& isServiceCancellable
		&& (showToStakeholders || isIE || email === 'ajeet@cogoport.com');

	if (!showCancelButton) {
		return null;
	}

	const renderContent = () => {
		if (isIE && !isRequested) {
			return (
				<RequestCancellation
					showCancel={showCancel}
					setShowCancel={setShowCancel}
					onClose={() => setShow(false)}
					refetch={refetch}
				/>
			);
		}

		return null;
	};
	return (
		<div>
			{tradePartyType !== 'shipper' && tradeType !== 'import' && is_end_to_end ? (
				<div className={styles.container}>
					<Popover
						interactive
						visible={show && !showCancel}
						show={show}
						theme="light"
						arrow={false}
						onClickOutside={() => setShow(false)}
						render={renderContent()}
					>
						<div
							role="presentation"
							className={styles.icon_container}
							id="bm_show_options_btn"
							onClick={() => setShow(true)}
						>
							<IcMOverflowDot />
						</div>
					</Popover>
				</div>
			) : null}
		</div>

	);
}

export default Cancellation;
