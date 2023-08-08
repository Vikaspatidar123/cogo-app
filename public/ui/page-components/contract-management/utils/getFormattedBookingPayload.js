import { differenceInDays } from '@cogoport/utils';

const MAIN_SERVICES = ['lcl_freight', 'air_freight'];

export const formattedBookingPayload = ({ item = {}, data = {}, contractId = '' }) => {
	const { service_id, service_type, contract_services_utilisation_id } =		data || {};
	const { trucks_count = 0, weight, volume, packages_count, primary_service_id } = item || {};

	return {
		service_id,
		service_type,
		contract_id: contractId,
		contract_services_utilisation_id:
			contract_services_utilisation_id || undefined,
		source : 'contract',
		data   : {
			...item,
			...(MAIN_SERVICES.includes(service_type) && {
				attributes: [
					{
						weight,
						volume,
						packages_count,
						primary_service_id,
					},
				],
			}),
			trucks_count : trucks_count || undefined,
			bls_count    : 1,
			bl_type      : 'rfs',
			transit_time : Math.abs(
				differenceInDays(new Date(item.arrival), new Date(item.departure)),
			),
		},
	};
};
