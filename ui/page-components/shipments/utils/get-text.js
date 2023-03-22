import { startCase } from '@cogoport/utils';

import isDocPresent from './is-doc-present';

const mainServices = [
	'fcl_freight_service',
	'lcl_freight_service',
	'air_freight_service',
	'ftl_freight_service',
	'trailer_freight_service',
	'ltl_freight_service',
	'haulage_freight_service',
	'fcl_customs_service',
	'lcl_customs_service',
	'air_customs_service',
];

const doc = {
	fcl_freight         : 'booking_note',
	fcl_freight_service : 'booking_note',
	lcl_freight         : 'carting_order',
	lcl_freight_freight : 'carting_order',
	air_freight         : 'airway_bill',
	air_freight_service : 'airway_bill',
};

const statusMappings = {
	confirmed: {
		icon : 'tick',
		main : 'Your booking is confirmed.',
		sub  : 'Booking Note yet to be procured from the carrier, subject to availability with the carrier.You should receive your Booking Note by',
	},
	service_confirmed: {
		main : 'Your booking is confirmed.',
		sub  : '',
		icon : 'tick',
	},
	cancelled: {
		icon : 'cross',
		main : 'Your booking is cancelled.',
		sub  : '',
	},
	completed: {
		icon   : 'tick',
		main   : 'Your booking is completed.',
		sub    : 'Sit back and relax',
		button : 'Ask for Feedback',
	},
	in_cart: {
		icon : 'thumb',
		main : 'Booking Successfully Placed! ',
		info : 'We need some information for faster SI generation and BL release. So please provide us with contacts who we can approach for further liaisoning.',
	},
	service_in_cart: {
		icon : 'thumb',
		main : 'You have received a booking!.',
		sub  : 'So please confirm the booking and increase your contacts',
	},
	user_confirmed: {
		icon : 'thumb',
		main : 'Your shipment is yet to be allocated. ',
		sub  : 'We are in process of allocating your shipment.',
	},
	booking_allocated: {
		icon : 'thumb',
		main : 'Your shipment has been allocated. ',
		sub  : 'We are in process of confirming your booking with the service provider',
	},
	margin_rejected: {
		icon : 'cross',
		main : 'Your Margin Approval is Rejected.',
		sub  : '',
	},
};

const getText = (
	shipment_data,
	services,
	viewAs,
	isList = false,
	margin_approval_status,
) => {
	const { documents, state, shipment_type, service_type } = shipment_data || {};

	const isDocThere = isDocPresent(
		documents || [],
		doc[shipment_type || service_type],
	);

	if (viewAs === 'importer_exporter') {
		const service = services?.find((serviceItem) => mainServices.includes(serviceItem?.service_type));
		const unconfirmedStates = ['shipment_received', 'init'];
		const isAllocated =			service?.state === 'awaiting_service_provider_confirmation';
		const unconfirmedServiceStates = [
			'awaiting_service_provider_confirmation',
			'init',
		];
		const isBookingConfirmed = !unconfirmedStates.includes(state);
		const isMainServiceConfirmed = !unconfirmedServiceStates.includes(
			service?.state || '',
		);
		const name = {
			fcl_freight : 'Awaiting BN',
			lcl_freight : 'Awaiting Carting order',
			air_freight : 'Awaiting master AWB',
		};
		if (state === 'cancelled' || state === 'aborted') {
			return {
				text       : 'Booking Cancelled',
				color      : 'red',
				isDocThere : true,
				stateInfo  : {
					...statusMappings.cancelled,
					sub: `Reason for cancellation - ${startCase(
						shipment_data?.cancellation_reason,
					)}`,
				},
			};
		}
		if (state === 'completed') {
			return {
				text       : 'Booking Completed',
				color      : 'green',
				isDocThere : true,
				stateInfo  : statusMappings.completed,
			};
		}
		if (isBookingConfirmed && isDocThere) {
			return {
				text      : 'Booking Confirmed',
				color     : 'green',
				isDocThere,
				stateInfo : statusMappings.confirmed,
			};
		}
		if (isBookingConfirmed && isMainServiceConfirmed && !isDocThere) {
			const text = name[shipment_type];
			return {
				text       : text || 'Booking Received',
				color      : 'yellow',
				isDocThere : !text,
				stateInfo  : statusMappings.confirmed,
			};
		}
		if (isBookingConfirmed && isAllocated && !isMainServiceConfirmed) {
			return {
				text      : 'Booking Received',
				color     : 'yellow',
				isDocThere,
				stateInfo : statusMappings.booking_allocated,
			};
		}
		if (isBookingConfirmed && !isMainServiceConfirmed) {
			return {
				text      : 'Booking Received',
				color     : 'yellow',
				isDocThere,
				stateInfo : statusMappings.user_confirmed,
			};
		}
		return {
			text      : 'Added to Cart',
			color     : 'yellow',
			isDocThere,
			stateInfo : statusMappings.in_cart,
		};
	}
	if (viewAs !== 'importer_exporter') {
		const unconfirmedStates = [
			'awaiting_service_provider_confirmation',
			'init',
		];
		const isBookingConfirmed = !unconfirmedStates.includes(state);
		const isMarginApprovalRejected = margin_approval_status === 'rejected';
		const name = {
			fcl_freight_service : 'Upload Booking note ',
			lcl_freight_service : 'Upload Carting order',
			air_freight_service : 'Upload master AWB',
		};
		if (isMarginApprovalRejected) {
			return {
				text      : 'Margin Rejected',
				color     : 'red',
				stateInfo : { ...statusMappings.margin_rejected },
			};
		}
		if (state === 'cancelled' || state === 'aborted') {
			return {
				text       : 'Booking Cancelled',
				color      : 'red',
				isDocThere : true,
				stateInfo  : {
					...statusMappings.cancelled,
					sub: `Reason for cancellation  - ${startCase(
						shipment_data?.cancellation_reason,
					)}`,
				},
			};
		}
		if (state === 'completed') {
			return {
				text       : 'Booking Completed',
				color      : 'green',
				isDocThere : true,
				stateInfo  : statusMappings.completed,
			};
		}
		if (isBookingConfirmed && isDocThere) {
			return {
				text      : isList ? startCase(state) : 'Shipment ongoing',
				color     : 'green',
				isDocThere,
				stateInfo : statusMappings.service_confirmed,
			};
		}
		if (isBookingConfirmed && !isDocThere) {
			const text = name[service_type];
			return {
				text       : 'Shipment ongoing',
				color      : !text ? 'green' : 'yellow',
				stateInfo  : statusMappings.service_confirmed,
				isDocThere : !text,
			};
		}
		return {
			text      : 'Booking Received',
			color     : 'yellow',
			isDocThere,
			stateInfo : statusMappings.service_in_cart,
		};
	}
	return {
		text      : 'Booking Received',
		color     : 'yellow',
		isDocThere,
		stateInfo : statusMappings.service_in_cart,
	};
};
export default getText;
