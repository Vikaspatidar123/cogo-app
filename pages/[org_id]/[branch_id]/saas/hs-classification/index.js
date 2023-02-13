import HsCode from '@/ui/page-components/hs-code';

function HsCodeComponent() {
	return <HsCode />;
}
HsCodeComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'HsCode Classification',
	},
});

export default HsCodeComponent;
