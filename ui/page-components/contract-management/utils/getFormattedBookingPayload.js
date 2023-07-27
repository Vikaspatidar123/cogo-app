import { differenceInDays } from '@cogoport/utils';

export const formattedBookingPayload = ({ item = {}, data = {}, contractId = '' }) => {
	const { service_id, service_type, contract_services_utilisation_id } =		data || {};

	return {
		service_id,
		service_type,
		contract_id: contractId,
		contract_services_utilisation_id:
			contract_services_utilisation_id || undefined,
		source : 'contract',
		data   : {
			...item,
			bls_count    : 1,
			bl_type      : 'rfs',
			transit_time : Math.abs(
				differenceInDays(new Date(item.arrival), new Date(item.departure)),
			),
		},
	};
};
