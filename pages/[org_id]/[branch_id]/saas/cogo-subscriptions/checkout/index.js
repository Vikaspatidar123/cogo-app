import CogoSubscriptionCheckoutPage from '@/ui/page-components/cogo-subscriptions/components/checkout';

function CogoSubscriptionCheckout() {
	return <CogoSubscriptionCheckoutPage />;
}
CogoSubscriptionCheckout.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Saas Tools',
	},
});

export default CogoSubscriptionCheckout;
