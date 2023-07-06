import { useRouter } from '@/packages/next';
import { downloadDocument } from '@/ui/commons/utils/downloadDocument';

const downloadQuotation = (quotationId) => {
	window.open(`${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/saas/pdf/${quotationId}`);
};

const useRedirectUrl = () => {
	const { push, query = {} } = useRouter();
	const { org_id, branch_id } = query || {};

	const subscriptionsUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${org_id}/${branch_id}/saas/cogo-subscriptions`;

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

	return {
		redirectQuotation,
		redirectPreview,
		redirectEdit,
		redirectViewQuote,
		downloadQuotation,
		redirectRecentSearch,
		subscriptionsUrl,
		redirectTransaction,
		downloadTransactionDocument: downloadDocument,
	};
};
export default useRedirectUrl;
