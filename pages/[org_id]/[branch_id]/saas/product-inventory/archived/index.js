import ArchiveList from '@/ui/page-components/product-catalouge/components/ArchiveList/List';

function ProductCatalougeArchievedComponent() {
	return <ArchiveList />;
}
ProductCatalougeArchievedComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Product Catalouge',
	},
});

export default ProductCatalougeArchievedComponent;
