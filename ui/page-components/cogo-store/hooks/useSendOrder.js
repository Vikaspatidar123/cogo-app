import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useSendOrder = () => {
	const [commError, setCommError] = useState(false);

	const [{ loading, data }, trigger] = useRequest({
		url: '/send_cogostore_communication',
		method: 'post',
	}, { manual: true });

	const createPayload = (formData, orderItemId, checked) => {
		const { country_code = '', number = '' } = formData?.mobile_no || {};

		const mobileNumber = country_code?.slice(0, 1) === '+'
			? `${country_code?.slice(1).replace(' ', '')}${number}`
			: `${country_code.replace(' ', '')}${number}`;

		const payload = {
			id: orderItemId,
			email: formData?.email,
			recipient_name: formData?.receipientName,
			sender_name: formData?.senderName,
			is_gift: !!formData?.giftShare,
			whatsapp_number_eformat: mobileNumber,
			communication_type: checked,
		};
		return payload;
	};

	const sendOrderFn = async ({ formData, orderItemId, checked }) => {
		const value = createPayload(formData, orderItemId, checked);
		try {
			await trigger({
				data: { ...value },
			});
		} catch (error) {
			setCommError(true);
		}
	};

	return {
		sendOrderFn,
		loading,
		respId: data?.id,
		commError,
	};
};

export default useSendOrder;
