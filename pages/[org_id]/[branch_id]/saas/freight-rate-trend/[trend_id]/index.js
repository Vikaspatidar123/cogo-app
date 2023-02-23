import ActiveFreightRateTrend from '@/ui/page-components/active-freight-rate-trend';

function activeFreightRateTrendComponent() {
	return <ActiveFreightRateTrend />;
}
activeFreightRateTrendComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Freight Rate Trend',
	},
});

export default activeFreightRateTrendComponent;
