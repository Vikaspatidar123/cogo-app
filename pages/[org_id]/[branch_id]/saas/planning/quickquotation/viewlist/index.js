import QuotationListView from '@/ui/page-components/quotation/ListView';

function ListQuotation() {
	return <QuotationListView />;
}

ListQuotation.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Quick Quotation',
	},
});

export default ListQuotation;
