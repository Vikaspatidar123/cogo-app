import Header from './components/Header';
import Outstanding from './components/Outstanding';
import TableList from './components/TableList';
import useGetInvoiceDetails from './hooks/useGetInvoiceDetails';

function PaymentDashboard() {
	const {
		invoiceDetails,
		pageData,
		loading,
		setPageData,
		searchQuery,
		onQueryChange,
		debounceQuery,
		orderBy,
		setOrderBy,
		requestType,
		setQuery,
		setRequestType,
		pagination,
		setPagination,
		getInvoiceDetails,
		setInvoiceStatus,
		invoiceStatus,
	} = useGetInvoiceDetails();

	return (
		<div>
			<Header />

			<Outstanding />
			<TableList
				debounceQuery={debounceQuery}
				searchQuery={searchQuery}
				onQueryChange={onQueryChange}
				setQuery={setQuery}
				loading={loading}
				pageData={pageData}
				setPageData={setPageData}
				invoiceDetails={invoiceDetails}
				orderBy={orderBy}
				setOrderBy={setOrderBy}
				requestType={requestType}
				setRequestType={setRequestType}
				pagination={pagination}
				setPagination={setPagination}
				getInvoiceDetails={getInvoiceDetails}
				setInvoiceStatus={setInvoiceStatus}
				invoiceStatus={invoiceStatus}
			/>
		</div>
	);
}
export default PaymentDashboard;
