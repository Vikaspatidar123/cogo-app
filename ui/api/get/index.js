import { request } from '@/packages/request';

export const getListOrganisation = (paylaod) => request.get(
	'/list_organization_users',
	{
		params: paylaod,
	},
);

export const getShipmentReport = (paylaod) => request.get(
	'/get_shipment_report_schedule',
	{
		params: paylaod,
	},
);
