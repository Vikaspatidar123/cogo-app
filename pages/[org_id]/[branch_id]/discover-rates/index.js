import Rate from '@/ui/page-components/cpq-tools';

function RateComponent() {
	return <Rate />;
}
RateComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Rate',
	},
});

export default RateComponent;
