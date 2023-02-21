import OrderHistory from '@/ui/page-components/order-history';

function orderHistoryComponent() {
	return <OrderHistory />;
}
orderHistoryComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Order History',
	},
});

export default orderHistoryComponent;
