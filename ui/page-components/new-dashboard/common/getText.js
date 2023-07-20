import { startCase } from '@cogoport/utils';

export const isDocPresent = (documents, name) => {
	const docObj = documents.find((document) => document.document_type === name);
	return !!docObj && docObj.document_type === name;
};

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
	fcl_freight: 'booking_note',
	fcl_freight_service: 'booking_note',
	lcl_freight: 'carting_order',
	lcl_freight_freight: 'carting_order',
	air_freight: 'airway_bill',
	air_freight_service: 'airway_bill',
};

const statusMappings = () => ({
	confirmed: {
		icon: 'tick',
		main: 'Your booking is confirmed.',
		sub: 'Booking Note yet to be procured from the carrier, subject to'
			+ 'availability with the carrier.You should receive your Booking Note by',
	},
	service_confirmed: {
		main: 'Your booking is confirmed.',
		sub: '',
		icon: 'tick',
	},
	cancelled: {
		icon: 'cross',
		main: 'Your booking is cancelled.',
		sub: '',
	},
	completed: {
		icon: 'tick',
		main: 'Your booking is completed.',
		sub: 'Sit back and relax',
	},
	in_cart: {
		icon: 'thumb',
		main: 'Booking Successfully Placed! ',
		info: 'We need some information for faster SI generation and BL release.'
			+ ' So please provide us with contacts who we can approach for further liaisoning.',
	},
	service_in_cart: {
		icon: 'thumb',
		main: 'You have recieved a booking!.',
		sub: 'So please confirm the booking and increase your contacts',
	},
	user_confirmed: {
		icon: 'thumb',
		main: 'Your shipment is yet to be allocated. ',
		sub: 'We are in process of allocating your shipment.',
	},
	booking_allocated: {
		icon: 'thumb',
		main: 'Your shipment has been allocated.  ',
		sub: 'We are in process of confirming your booking with the service provider',
	},
	margin_rejected: {
		icon: 'cross',
		main: 'Your Margin Approval is Rejected.',
		sub: '',
	},
});

const getText = (shipment_data, services, t) => {
	const { documents, state, shipment_type, service_type } = shipment_data || {};
	const isDocThere = isDocPresent(
		documents || [],
		doc[shipment_type || service_type],
	);
	const service = services?.find((serviceItem) => mainServices.includes(serviceItem?.service_type));
	const unconfirmedStates = ['shipment_received', 'init'];
	const isAllocated = service?.state === 'awaiting_service_provider_confirmation';
	const unconfirmedServiceStates = [
		'awaiting_service_provider_confirmation',
		'init',
	];
	const isBookingConfirmed = !unconfirmedStates.includes(state);
	const isMainServiceConfirmed = !unconfirmedServiceStates.includes(
		service?.state || '',
	);

	const name = {
		fcl_freight: t('dashboard:getTexts_fcl_freight'),
		lcl_freight: t('dashboard:getTexts_lcl_freight'),
		air_freight: t('dashboard:getTexts_air_freight'),
	};

	if (state === 'cancelled' || state === 'aborted') {
		return {
			text: t('dashboard:getTexts_booking_cancelled'),
			color: '#FBD69F',
			isDocThere: true,
			stateInfo: {
				...statusMappings().cancelled,
				sub: `${t('dashboard:getTexts_cancellation_subject')}- ${startCase(
					shipment_data?.cancellation_reason,
				)}`,
			},
		};
	}
	if (state === 'completed') {
		return {
			text: t('dashboard:getTexts_booking_completed'),
			color: '#B4F3BE',
			isDocThere: true,
			stateInfo: statusMappings().completed,
		};
	}
	if (isBookingConfirmed && isDocThere) {
		return {
			text: t('dashboard:getTexts_booking_confirmed'),
			color: '#B4F3BE',
			isDocThere,
			stateInfo: statusMappings().confirmed,
		};
	}
	if (isBookingConfirmed && isMainServiceConfirmed && !isDocThere) {
		const text = name[shipment_type];
		return {
			text: text || t('dashboard:getTexts_booking_received'),
			color: '#FBD69F',
			isDocThere: !text,
			stateInfo: statusMappings().confirmed,
		};
	}
	if (isBookingConfirmed && isAllocated && !isMainServiceConfirmed) {
		return {
			text: t('dashboard:getTexts_booking_received'),
			color: '#FBD69F',
			isDocThere,
			stateInfo: statusMappings().booking_allocated,
		};
	}
	if (isBookingConfirmed && !isMainServiceConfirmed) {
		return {
			text: t('dashboard:getTexts_booking_received'),
			color: '#FBD69F',
			isDocThere,
			stateInfo: statusMappings().user_confirmed,
		};
	}
	return {
		text: t('dashboard:getTexts_addedToCart'),
		color: '#FBD69F',
		isDocThere,
		stateInfo: statusMappings().in_cart,
	};
};
export default getText;
