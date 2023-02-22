import TraderEligibiltyCheck from '@/ui/page-components/trader-eligibility-check';

function TraderEligibiltyCheckComponent() {
	return <TraderEligibiltyCheck />;
}
TraderEligibiltyCheckComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Trader Eligibilty Check',
	},
});
export default TraderEligibiltyCheckComponent;
