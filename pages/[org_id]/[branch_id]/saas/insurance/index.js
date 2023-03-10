import Insurance from '@/ui/page-components/insurance/index';

function insuranceComponent() {
	return <Insurance />;
}
insuranceComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Insurance',
	},
});

export default insuranceComponent;
