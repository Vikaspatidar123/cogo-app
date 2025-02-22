import { useRequest } from '@/packages/request';

const useCreateShipmentMapping = () => {
	const [{ loading }, trigger] = useRequest({
		url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/update_shipment_cogoid`,
		method : 'put',
	}, { manual: true });
	const submitShipmentMapping = async ({
		cogo_shipment_id = undefined,
		cogo_shipment_serial_no = undefined,
		bill_of_lading = undefined,
		booking_reference = undefined,
		general_reference = undefined,
		purchase_invoice = undefined,
		shipping_instruction = undefined,
		voyage_reference = undefined,
		booking_note = undefined,
		mail_id = undefined,
	}) => {
		try {
			await trigger({
				data: {
					bill_of_lading,
					booking_note,
					booking_reference,
					general_reference,
					mail_id,
					purchase_invoice,
					shipping_instruction,
					voyage_reference,
					cogo_shipment_id,
					cogo_shipment_serial_no,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return { submitShipmentMapping, loading };
};

export default useCreateShipmentMapping;
