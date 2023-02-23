import CogoSubscriptions from '@/ui/page-components/cogo-subscriptions/components/manage-subscription';

function CogoSubscription() {
	return <CogoSubscriptions />;
}
CogoSubscription.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Saas Tools',
	},
});

export default CogoSubscription;
