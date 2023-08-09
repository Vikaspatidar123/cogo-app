import { useState, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import useSearchQuery from '@/ui/commons/utils/useSearchQuery';

const useGetInvoiceDetails = () => {
	const { query, debounceQuery } = useSearchQuery();
	const [requestType, setRequestType] = useState('All');
	const [invoiceDetails, setInvoiceDetails] = useState([]);
	const [searchQuery, setSearchQuery] = useState();
	const [orderBy, setOrderBy] = useState({
		key   : '',
		order : '',
	});
	const [pagination, setPagination] = useState(1);
	const [pageData, setPageData] = useState({});
	const [loading, setLoading] = useState(false);
	const [invoiceStatus, setInvoiceStatus] = useState(['unpaid']);

	const { organizationId, kyc_status } = useSelector(({ profile }) => ({
		organizationId : profile?.organization?.id,
		kyc_status     : profile?.organization?.kyc_status,
	}));

	const triggerApi = kyc_status === 'verified' && organizationId !== null;

	const [{ data }, trigger] = useRequestBf({
		url     : '/sales/outstanding/invoice-list',
		method  : 'get',
		authKey : 'get_sales_outstanding_invoice_list',
	}, { manual: true });

	const onQueryChange = (value) => {
		debounceQuery(value);
		setSearchQuery(value);
		setPagination(1);
	};

	const params = {
		query             : query || undefined,
		paymentStatusList : invoiceStatus || undefined,
		bookingPartyId    : organizationId,
		pageLimit         : 10,
		sortType          : orderBy.order || undefined,
		sortBy            : orderBy.key || undefined,
		page              : pagination,
	};

	const getInvoiceDetails = async () => {
		try {
			setLoading(true);
			const res = await trigger({ params });

			if (res?.data) {
				setInvoiceDetails(res?.data?.list);
				setPageData(res?.data);
				setLoading(false);
			}
		} catch (err) {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (triggerApi) {
			getInvoiceDetails();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		pagination,
		orderBy,
		setPageData,
		requestType,
		query,
		setPagination,
		invoiceStatus,
	]);

	return {
		invoiceDetails,
		setPageData,
		pageData: pageData || {},
		setInvoiceDetails,
		getInvoiceDetails,
		onQueryChange,
		orderBy,
		setOrderBy,
		loading,
		requestType,
		setRequestType,
		pagination,
		setPagination,
		searchQuery,
		setInvoiceStatus,
		invoiceStatus,
		data,
	};
};

export default useGetInvoiceDetails;
