import { Toast } from '@cogoport/components';
import { useState } from 'react';

import useform from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const controls = [
	{
		name        : 'amendment_reason',
		label       : 'What do you want to Amend?',
		type        : 'textarea',
		placeholder : 'Please tell us what would you want to amend.',
		rules       : { required: 'required' },
		span        : 12,
		rows        : 2,
	},
	{
		name        : 'amendment_subreason',
		type        : 'textarea',
		span        : 12,
		label       : 'Why do you want to Request Amendment?',
		placeholder : 'Please tell us why.',
		rules       : { required: 'required' },
		rows        : 2,
	},
];

const useReviewInvoice = ({ invoice, onClose }) => {
	const [errors, setErrors] = useState({});

	const { control, handleSubmit } = useform(controls);
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_invoice_status',
		method : 'post',
	}, { manual: true });

	const onError = (err) => {
		setErrors(err);
	};

	const onReview = async (values) => {
		try {
			const data = values?.amendment_reason
				? {
					amendment_reason    : values?.amendment_reason,
					amendment_subreason : values?.amendment_subreason,
				}
				: undefined;
			const res = await trigger({
				data: {
					id               : invoice?.id,
					status           : values?.status || 'amendment_requested',
					amendment_detail : data,
				},
			});

			if (!res.hasError) {
				Toast.success('Status updated successfully!');
				if (onClose) {
					onClose();
				}
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};

	const handleApprove = () => {
		onReview({ status: 'approved' });
	};

	return {
		onReview,
		control,
		errors,
		controls,
		onError,
		handleSubmit,
		loading,
		handleApprove,
	};
};

export default useReviewInvoice;
