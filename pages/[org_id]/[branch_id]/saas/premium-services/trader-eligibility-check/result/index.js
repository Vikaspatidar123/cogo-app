import ListPage from '@/ui/page-components/trader-eligibility-check/components/ListPage';

function ListPageComponent() {
	return <ListPage />;
}
ListPageComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Trader Eligibilty Check',
	},
});
export default ListPageComponent;
