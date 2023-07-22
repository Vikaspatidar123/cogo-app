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
	fcl_freight         : 'booking_note',
	fcl_freight_service : 'booking_note',
	lcl_freight         : 'carting_order',
	lcl_freight_freight : 'carting_order',
	air_freight         : 'airway_bill',
	air_freight_service : 'airway_bill',
};

const statusMappings = (t) => ({
	confirmed: {
		icon : 'tick',
		main : t('dashboard:helpers_getText_statusMappings_confirmed_main'),
		sub  : t('dashboard:helpers_getText_statusMappings_confirmed_sub'),
	},
	service_confirmed: {
		main: t(
			'dashboard:helpers_getText_statusMappings_service_confirmed_main',
		),
		sub  : '',
		icon : 'tick',
	},
	cancelled: {
		icon : 'cross',
		main : t('dashboard:helpers_getText_statusMappings_cancelled_main'),
		sub  : '',
	},
	completed: {
		icon : 'tick',
		main : t('dashboard:helpers_getText_statusMappings_completed_main'),
		sub  : t('dashboard:helpers_getText_statusMappings_completed_sub'),
	},
	in_cart: {
		icon : 'thumb',
		main : t('dashboard:helpers_getText_statusMappings_in_cart_main'),
		info : t('dashboard:helpers_getText_statusMappings_in_cart_sub'),
	},
	service_in_cart: {
		icon : 'thumb',
		main : t('dashboard:helpers_getText_statusMappings_service_in_cart_main'),
		sub  : t('dashboard:helpers_getText_statusMappings_service_in_cart_sub'),
	},
	user_confirmed: {
		icon : 'thumb',
		main : t('dashboard:helpers_getText_statusMappings_user_confirmed_main'),
		sub  : t('dashboard:helpers_getText_statusMappings_user_confirmed_sub'),
	},
	booking_allocated: {
		icon : 'thumb',
		main : t(
			'dashboard:helpers_getText_statusMappings_booking_allocated_main',
		),
		sub: t('dashboard:helpers_getText_statusMappings_booking_allocated_sub'),
	},
	margin_rejected: {
		icon : 'cross',
		main : t('dashboard:helpers_getText_statusMappings_margin_rejected_main'),
		sub  : '',
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
		fcl_freight : t('dashboard:getTexts_fcl_freight'),
		lcl_freight : t('dashboard:getTexts_lcl_freight'),
		air_freight : t('dashboard:getTexts_air_freight'),
	};

	if (state === 'cancelled' || state === 'aborted') {
		return {
			text       : t('dashboard:getTexts_booking_cancelled'),
			color      : '#FBD69F',
			isDocThere : true,
			stateInfo  : {
				...statusMappings(t).cancelled,
				sub: `${t('dashboard:getTexts_cancellation_subject')}- ${startCase(
					shipment_data?.cancellation_reason,
				)}`,
			},
		};
	}
	if (state === 'completed') {
		return {
			text       : t('dashboard:getTexts_booking_completed'),
			color      : '#B4F3BE',
			isDocThere : true,
			stateInfo  : statusMappings(t).completed,
		};
	}
	if (isBookingConfirmed && isDocThere) {
		return {
			text      : t('dashboard:getTexts_booking_confirmed'),
			color     : '#B4F3BE',
			isDocThere,
			stateInfo : statusMappings(t).confirmed,
		};
	}
	if (isBookingConfirmed && isMainServiceConfirmed && !isDocThere) {
		const text = name[shipment_type];
		return {
			text       : text || t('dashboard:getTexts_booking_received'),
			color      : '#FBD69F',
			isDocThere : !text,
			stateInfo  : statusMappings(t).confirmed,
		};
	}
	if (isBookingConfirmed && isAllocated && !isMainServiceConfirmed) {
		return {
			text      : t('dashboard:getTexts_booking_received'),
			color     : '#FBD69F',
			isDocThere,
			stateInfo : statusMappings(t).booking_allocated,
		};
	}
	if (isBookingConfirmed && !isMainServiceConfirmed) {
		return {
			text      : t('dashboard:getTexts_booking_received'),
			color     : '#FBD69F',
			isDocThere,
			stateInfo : statusMappings(t).user_confirmed,
		};
	}
	return {
		text      : t('dashboard:getTexts_addedToCart'),
		color     : '#FBD69F',
		isDocThere,
		stateInfo : statusMappings(t).in_cart,
	};
};
export default getText;
