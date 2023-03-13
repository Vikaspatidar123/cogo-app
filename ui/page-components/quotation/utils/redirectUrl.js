/* eslint-disable no-undef */
import { useRouter } from 'next/router';

const useRedirectUrl = () => {
	const { push } = useRouter();
	const { query = {} } = useRouter();
	const { org_id, branch_id, account_type } = query || {};
	const subscriptionsUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/cogo-subscriptions`;

	const redirectQuotation = () => {
		push('/saas/quickquotation/createquotation');
	};
	const redirectQuotationPrefill = () => {
		push('/saas/quickquotation/createquotation?prefill=true');
	};
	const redirectPreview = (quotationId) => {
		push(
			'/saas/quickquotation/viewquotation/[id]',
			`/saas/quickquotation/viewquotation/${quotationId}`,
		);
	};
	const redirectEdit = (editId) => {
		push(
			'/saas/quickquotation/editquotation/[id]',
			`/saas/quickquotation/editquotation/${editId}`,
		);
	};
	const redirectViewQuote = () => {
		push('/saas/quickquotation/viewlist');
	};
	const redirectTransaction = () => {
		push('/saas/transaction-history');
	};
	const downloadQuotation = (quotationId) => {
		window.open(`${process.env.BUSINESS_FINANCE_BASE_URL}/saas/pdf/${quotationId}`);
	};

	const downloadTransactionDocument = ({ docLink, docName, hsNumber }) => {
		const url = `${process.env.BUSINESS_FINANCE_BASE_URL}
        /saas/trade-engine/pdf?docLink=${docLink}&docName=${docName}&hsNumber=${hsNumber}`;
		window.open(url);
	};
	return {
		redirectQuotation,
		redirectPreview,
		redirectEdit,
		redirectViewQuote,
		downloadQuotation,
		redirectQuotationPrefill,
		subscriptionsUrl,
		redirectTransaction,
		downloadTransactionDocument,
	};
};
export default useRedirectUrl;
