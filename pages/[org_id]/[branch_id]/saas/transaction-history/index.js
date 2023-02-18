import TransactionHistory from '@/ui/page-components/transactionHistory';

function transactionHistoryComponent() {
	return <TransactionHistory />;
}
transactionHistoryComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Transaction History',
	},
});

export default transactionHistoryComponent;
