import { Button, Input, Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import useFetchInvoiceList from '../../hooks/useFetchInvoiceList';

import AddFundingRequest from './components/AddFundingRequest';
import InvoiceDetails from './components/InvoiceDetails';
import InvoiceList from './components/InvoiceList';
import styles from './styles.module.css';

function Invoices({
	getCreditRequestResponse = {},
}) {
	const [showCiDetails, setShowCiDetails] = useState({
		flag                       : false,
		sid                        : '',
		id                         : '',
		invoice_number             : '',
		credit_export_factoring_id : '',
	});
	const [openAddFundingRequest, setOpenFundingRequest] = useState();

	const {
		loading,
		data: invoiceList,
		pagination,
		setPagination,
		setSearchValue,
		searchValue,
		fetchInvoiceList,
	} = useFetchInvoiceList({
		getCreditRequestResponse,
	});

	const { total_count = '', list = [], page_limit = '' } = invoiceList || {};

	return (
		<div>
			{!showCiDetails.flag && (
				<div>
					<div className={styles.divFlex}>
						<Button
							themeType="primary"
							size="md"
							onClick={() => setOpenFundingRequest((pv) => !pv)}
							type="button"
						>
							Create Funding Request
						</Button>
					</div>
					<div className={styles.divFlex}>
						<Input
							value={searchValue}
							placeholder="Search by SID/FID/INVOICE NO."
							style={{ width: '300px' }}
							prefix={<IcMSearchlight width="20px" height="20px" />}
							onChange={(e) => setSearchValue(e)}
						/>
					</div>
					<div className={styles.headFlex}>
						<div className={styles.tableHeader} style={{ width: '15%' }}>Invoice No</div>
						<div className={styles.tableHeader} style={{ width: '17%' }}>Gross Invoice Amt</div>
						<div className={styles.tableHeader} style={{ width: '15%' }}>Date Created</div>
						<div className={styles.tableHeader} style={{ width: '30%' }}>Buyer Name</div>
						<div className={styles.tableHeader} style={{ width: '20%' }}>Status</div>
					</div>

					{!loading && (list || []).length > 0
						&& (list || []).map((invoice) => (
							<InvoiceList
								key={invoice.id}
								invoice={invoice}
								creditRequest={getCreditRequestResponse}
								refetch={fetchInvoiceList}
								setShowCiDetails={setShowCiDetails}
							/>
						))}

					<div className={styles.divFlex}>
						<Pagination
							className="sm"
							type="table"
							currentPage={pagination}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={(val) => {
								setPagination((prev) => ({ ...prev, page: val }));
							}}
						/>
					</div>
				</div>
			)}

			{showCiDetails.flag && (
				<InvoiceDetails
					refetchList={fetchInvoiceList}
					creditRequest={getCreditRequestResponse}
					setShowCiDetails={setShowCiDetails}
					showCiDetails={showCiDetails}
				/>
			)}
			{openAddFundingRequest && (
				<AddFundingRequest
					refetchList={fetchInvoiceList}
					creditRequest={getCreditRequestResponse}
					openAddFundingRequest={openAddFundingRequest}
					setOpenFundingRequest={setOpenFundingRequest}
				/>
			)}
		</div>
	);
}

export default Invoices;
