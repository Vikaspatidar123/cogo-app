import InvoiceTable from '../components/InvoiceTable';
import PaymentsTable from '../components/PaymentsTable';

export const RAISE_ISSUE_OPTIONS = [
	{ label: 'Invoice', value: 'invoice' },
	{ label: 'Payment', value: 'payment' },
];

export const ISSUE_COMPONENT_MAPPING = {
	invoice : InvoiceTable,
	payment : PaymentsTable,
};

export const typeOptions = [
	'Credit Note Pending',
	'Invoice(s) do not belong to me/company',
	'Invoice Amount Mismatch',
	'Amount Already Paid',
	'Not the authorised user',
	'dunning',
];
