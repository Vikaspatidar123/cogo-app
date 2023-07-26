import { isEmpty, getByKey } from '@cogoport/utils';

export const getDocumentNumber = ({ itemData }) => {
	const isPresent = ['irnNumber', 'invoiceNumber'].some((item) => !isEmpty(getByKey(itemData, item)));

	let key = 'proformaNumber';

	if (isPresent) {
		key = itemData?.eInvoicePdfUrl ? 'irnNumber' : 'invoiceNumber';
	}
	return getByKey(itemData, key);
};

export const getDocumentUrl = ({ itemData }) => {
	const isPresent = ['eInvoicePdfUrl', 'invoicePdf'].some((item) => !isEmpty(getByKey(itemData, item)));

	let key = 'proformaPdfUrl';

	if (isPresent) {
		key = itemData?.eInvoicePdfUrl ? 'eInvoicePdfUrl' : 'invoicePdf';
	}
	return getByKey(itemData, key);
};
