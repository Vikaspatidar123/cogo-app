import FreightRateTrend from '@/ui/page-components/freight-rate-trend';

function freightRatetrendComponent() {
	return <FreightRateTrend />;
}
freightRatetrendComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Freight Rate Trend',
	},
});

export default freightRatetrendComponent;
