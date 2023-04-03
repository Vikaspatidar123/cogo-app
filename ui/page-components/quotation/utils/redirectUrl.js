/* eslint-disable no-undef */
import { useRouter } from '@/packages/next';

const useRedirectUrl = () => {
	const { push } = useRouter();
	const { query = {} } = useRouter();
	const { org_id, branch_id, account_type } = query || {};
	const subscriptionsUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/cogo-subscriptions`;

	const redirectQuotation = () => {
		push('/saas/quickquotation/createquotation');
	};
	const redirectRecentSearch = () => {
		push('/saas/quickquotation/createquotation?recentSearch=true');
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
		window.open(`${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/saas/pdf/${quotationId}`);
	};

	const downloadTransactionDocument = ({ docLink, docName, hsNumber }) => {
		// eslint-disable-next-line max-len
		const url = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/saas/trade-engine/pdf?docLink=${docLink}&docName=${docName}&hsNumber=${hsNumber}`;
		window.open(url);
	};
	return {
		redirectQuotation,
		redirectPreview,
		redirectEdit,
		redirectViewQuote,
		downloadQuotation,
		redirectRecentSearch,
		subscriptionsUrl,
		redirectTransaction,
		downloadTransactionDocument,
	};
};
export default useRedirectUrl;
