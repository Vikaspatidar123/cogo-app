import { isEmpty } from '@cogoport/utils';

const formatPayload = ({ val, selectedInvoices, selectedpayments }) => {
	const {
		issue_type,
		additional_information,
		file_url = [],
		notification_perferrences,
	} = val || {};

	const invoiceData = !isEmpty(Object.keys(selectedInvoices || {}))
		? Object.keys(selectedInvoices || {}).map((item) => ({
			Invoice_Number : item,
			Invoice_Url    : selectedInvoices?.[item],
		}))
		: undefined;

	const paymentData = (selectedpayments || []).map((i) => i?.toString());

	return {
		Category                : '',
		Subcategory             : '',
		NotificationPreferences : notification_perferrences || [],
		Data                    : {
			Attachment : file_url || [],
			Invoice    : invoiceData,
			Payment    : !isEmpty(paymentData) ? paymentData : undefined,
		},
		Type        : issue_type,
		Description : additional_information,
	};
};

export default formatPayload;
