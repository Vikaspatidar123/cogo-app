import { request } from '@/packages/request';

export const updateShipmentReport = async (payload) => {
	const { data: response } = await request.post(
		'/update_shipment_report_schedule',
		payload,
	);
	return response.data;
};
