import DutiesTaxCalulator from '@/ui/page-components/duties-tax-calculator';

function DutiesTaxesCalculator() {
	return <DutiesTaxCalulator />;
}
DutiesTaxesCalculator.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Duties & Taxes Calculator',
	},
});
export default DutiesTaxesCalculator;
