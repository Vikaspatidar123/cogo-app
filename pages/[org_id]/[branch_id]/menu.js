import MobileMenu from '../../../ui/commons/components/MenuMobileView';

function MobileMenuComponent() {
	return <MobileMenu />;
}
MobileMenuComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Navigation',
	},
});
export default MobileMenuComponent;
