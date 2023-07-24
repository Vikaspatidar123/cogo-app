import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo } from 'react';

import Filters from '../Filters';

import EmptyTable from './EmptyTable';
// import FiltersModal from './FiltersModal';
import getColumns from './getColoums';
import InvoiceCard from './InvoiceCard';
import Loader from './Loading';
import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';

function TableList({
	loading,
	// setQuery,
	pageData,
	invoiceDetails,
	searchQuery,
	// setSearchQuery,
	orderBy,
	setOrderBy,
	// requestType,
	// setRequestType,
	setPagination,
	// getInvoiceDetails,
	onQueryChange,
	setInvoiceStatus,
	invoiceStatus,
	pagination,
}) {
	const geo = getGeoConstants();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const columns = useMemo(() => getColumns({ setOrderBy, orderBy, geo }), [orderBy, setOrderBy]);

	const renderTable = () => {
		if (!invoiceDetails?.length) {
			if (loading) {
				return <Loader />;
			}
			return <EmptyTable />;
		}
		if (loading) {
			return <Loader />;
		}
		return <Table columns={columns} data={invoiceDetails} />;
	};

	const renderPagination = () => (
		<div className={styles.flex} style={{ alignItems: 'center' }}>
			<Pagination
				className="md"
				currentPage={pagination}
				totalItems={pageData.totalRecords}
				pageSize={10}
				onPageChange={(val) => setPagination(val)}
			/>
		</div>
	);

	return (
		<div className={styles.main_div_style}>
			<div className={styles.flex} style={{ justifyContent: 'space-between' }}>
				<div className={styles.flex} style={{ flexDirection: 'column' }}>
					<text
						style={{ fontSize: '14px', fontWeight: '500', color: '#4F4F4F' }}
					>
						Invoice Table
					</text>
					<text className={styles.mobile_view} style={{ color: '#4F4F4F' }}>
						Click a amount to download invoice.
					</text>
				</div>
				{/* {isMobile && (
					<FiltersModal
						setQuery={setQuery}
						setPagination={setPagination}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						requestType={requestType}
						onQueryChange={onQueryChange}
						setRequestType={setRequestType}
						orderBy={orderBy}
						setOrderBy={setOrderBy}
						getInvoiceDetails={getInvoiceDetails}
						setInvoiceStatus={setInvoiceStatus}
						invoiceStatus={invoiceStatus}
					/>
				)} */}
			</div>
			<div className={`${styles.flex} ${styles.mobile_view}`} style={{ flexDirection: 'column' }}>
				{!isEmpty(invoiceDetails) ? (
					<>
						<InvoiceCard invoiceDetails={invoiceDetails} loading={loading} />
						<div
							className={styles.flex}
							style={{
								padding: '20px',
								paddingBottom: '30px',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{renderPagination()}
						</div>
					</>
				) : (
					<EmptyTable />
				)}
			</div>
			<div className={styles.web_view}>
				<div className={styles.flex} style={{ justifyContent: 'space-between' }}>
					<Filters
						searchQuery={searchQuery}
						onQueryChange={onQueryChange}
						setPagination={setPagination}
						setInvoiceStatus={setInvoiceStatus}
						invoiceStatus={invoiceStatus}
					/>
					{!isEmpty(invoiceDetails) && renderPagination()}
				</div>
				{renderTable()}
			</div>
		</div>
	);
}

export default TableList;
