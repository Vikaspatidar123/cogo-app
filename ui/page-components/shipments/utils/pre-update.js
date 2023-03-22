import { postData } from '../apis';

const preUpdateData = async ({
	payload,
	shipment_data,
	merge,
	setIsLoading,
	state,
	scope,
	setMessage,
}) => {
	if (
		payload?.document_type === 'invoice' &&
		payload?.documents?.[0]?.data?.cargo_value
	) {
		const { cargo_value, cargo_currency } = payload?.documents?.[0]?.data || {};
		const cargo_value_payload = {
			cargo_value,
			cargo_currency,
			id: shipment_data?.id,
		};
		try {
			const res = await postData(
				'update_shipment',
				merge(cargo_value_payload, state || {}),
				scope,
			);

			setIsLoading(false);
			if (res.hasError) {
				setMessage({ type: 'error', message: res.messages });
			}
			return res;
		} catch (err) {
			setIsLoading(false);
			setMessage({ type: 'error', message: err.message });
			return err;
		}
	}
	return {};
};
export default preUpdateData;
