import ContainerCalculator from '@/ui/page-components/container-calculator';

function loadCalculatorComponent() {
	return <ContainerCalculator />;
}
loadCalculatorComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Load Calculator',
	},
});

export default loadCalculatorComponent;
