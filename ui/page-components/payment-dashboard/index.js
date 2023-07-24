import Header from './components/Header';
import Outstanding from './components/Outstanding';
import TableList from './components/TableList';
import useGetInvoiceDetails from './hooks/useGetInvoiceDetails';
import useGetOrganizationOutstandings from './hooks/useGetOrganizationOutstandings';
import useGetServiceWiseOutstandings from './hooks/useGetServiceWiseOutstanding';

function PaymentDashboard() {
	const { statsList, statsLoading } = useGetOrganizationOutstandings();
	const { serviceWiseLoading, serviceWiseStats } = useGetServiceWiseOutstandings();
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
	const dataStatsList = statsList?.list?.[0] || {};

	return (
		<div>
			<Header />
			<Outstanding
				statsList={dataStatsList}
				statsLoading={statsLoading}
				serviceWiseStats={serviceWiseStats}
				serviceWiseLoading={serviceWiseLoading}
			/>
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
