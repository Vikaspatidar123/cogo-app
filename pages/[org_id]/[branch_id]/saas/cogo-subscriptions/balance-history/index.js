import BalanceHistory from '@/ui/page-components/cogo-subscriptions/balance-history';

function ToolsBalanceHistory() {
	return <BalanceHistory />;
}
ToolsBalanceHistory.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Saas Tools',
	},
});
export default ToolsBalanceHistory;
