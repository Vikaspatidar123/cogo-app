import ProductCatalouge from '@/ui/page-components/product-catalouge';

function ProductCatalougeComponent() {
	return <ProductCatalouge />;
}
ProductCatalougeComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Product Catalouge',
	},
});

export default ProductCatalougeComponent;
