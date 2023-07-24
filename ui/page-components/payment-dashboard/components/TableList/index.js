import { Pagination, Table, Tooltip, Button } from '@cogoport/components';
import {
	IcCRedCircle,
	IcMDownload,
	IcMArrowRotateRight,
	IcMArrowRotateLeft,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo } from 'react';

import { Service } from '../../constants/service-mapping';
import Filters from '../Filters';

import EmptyTable from './EmptyTable';
// import FiltersModal from './FiltersModal';
import InvoiceCard from './InvoiceCard';
import Loader from './Loading';
import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';

const geo = getGeoConstants();

function TableList({
	loading,
	setQuery,
	pageData,
	invoiceDetails,
	searchQuery,
	setSearchQuery,
	orderBy,
	setOrderBy,
	requestType,
	setRequestType,
	setPagination,
	getInvoiceDetails,
	onQueryChange,
	setInvoiceStatus,
	invoiceStatus,
	pagination,
}) {
	const columns = useMemo(
		() => [
			{

				Header: <div className={styles.head}>INVOICE ID</div>,
				accessor: 'invoiceNumber',
				Cell: ({ value }) => (
					<div className={styles.data}>
						<Tooltip placement="right" content={value}>
							<div className={styles.over_flow_div}>{value || '-'}</div>
						</Tooltip>
					</div>
				),
			},
			{
				Header: <div className={styles.head}>SHIPMENT ID</div>,
				accessor: 'id',
				width: 1,
				Cell: ({ row: { original } }) => (
					<text>
						<div className={styles.flex} style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<div className={styles.shipment_id_style} style={{ color: 'black' }}>
								{!original?.job?.id ? 'NA' : original?.job?.id}
							</div>
						</div>
					</text>
				),
			},
			{
				Header: <div className={styles.head}>TYPE OF SERVICE</div>,
				accessor: 'shipmentType',
				width: 1,
				Cell: ({ row: { original } }) => (
					<div className={styles.head}>
						{!original?.job?.shipmentType
							? 'NA'
							: Service?.[original?.job?.shipmentType]?.name}
						{' '}
					</div>
				),
			},
			{
				Header: (
					<div
						className={styles.head}
						role="presentation"
						onClick={() => setOrderBy((prev) => ({
							key: 'grandTotal',
							order: prev.order === 'Asc' ? 'Desc' : 'Asc',
						}))}
					>
						<div
							className={styles.flex}
							direction="column"
							style={{
								flexDirection: 'column',
								transform:
									orderBy.key === 'grandTotal'
									&& orderBy.order === 'Asc'
									&& 'rotate(180deg)',
							}}
						>
							<IcMArrowRotateRight
								size={12.6}
								style={{ transform: 'rotate(270deg)', cursor: 'pointer' }}
							/>
							<IcMArrowRotateLeft
								fill="#BDBDBD"
								size={12.6}
								style={{ transform: 'rotate(270deg)', cursor: 'pointer' }}
							/>
						</div>
						&nbsp;AMOUNT
					</div>
				),
				accessor: 'grandTotal',
				width: 1,
				Cell: ({ row: { original } }) => (
					<div className={styles.head} style={{ fontWeight: 'bold' }}>
						{!original.grandTotal
							? 'NA'
							: formatAmount({
								amount: original?.grandTotal || 0,
								currency: original?.currency,
								options: {
									style: 'currency',
									currencyDisplay: 'code',
									maximumFractionDigits: 0,
								},
							})}
					</div>
				),
			},
			{
				Header: (
					<div
						className={styles.head}
						role="presentation"
						onClick={() => setOrderBy((prev) => ({
							key: 'balanceAmount',
							order: prev.order === 'Asc' ? 'Desc' : 'Asc',
						}))}
					>
						<div
							className={styles.flex}
							style={{
								flexDirection: 'column',
								transform:
									orderBy.key === 'balanceAmount'
									&& orderBy.order === 'Asc'
									&& 'rotate(180deg)',
							}}
						>
							<IcMArrowRotateRight
								size={12.6}
								style={{ transform: 'rotate(270deg)', cursor: 'pointer' }}
							/>
							<IcMArrowRotateLeft
								fill="#BDBDBD"
								size={12.6}
								style={{ transform: 'rotate(270deg)', cursor: 'pointer' }}
							/>
						</div>
						&nbsp;AMOUNT DUE
					</div>
				),
				accessor: 'balanceAmount',
				width: 1,
				Cell: ({ row: { original } }) => (
					<div className={styles.head} style={{ fontWeight: 'bold' }}>
						{!original.balanceAmount
							? 'NA'
							: formatAmount({
								amount: original?.balanceAmount || 0,
								currency: original?.currency,
								options: {
									style: 'currency',
									currencyDisplay: 'code',
									maximumFractionDigits: 0,
								},
							})}
					</div>
				),
			},
			{
				Header: (
					<div
						className={styles.head}
						role="presentation"
						onClick={() => setOrderBy((prev) => ({
							key: 'invoiceDate',
							order: prev.order === 'Asc' ? 'Desc' : 'Asc',
						}))}
					>
						<div
							className={styles.flex}
							style={{
								flexDirection: 'column',
								transform:
									orderBy.key === 'invoiceDate'
									&& orderBy.order === 'Asc'
									&& 'rotate(180deg)',
								cursor: 'pointer',
							}}
						>
							<IcMArrowRotateRight
								size={12.6}
								style={{ transform: 'rotate(270deg)' }}
							/>
							<IcMArrowRotateLeft
								fill="#BDBDBD"
								size={12.6}
								style={{ transform: 'rotate(270deg)' }}
							/>
						</div>
						&nbsp;INVOICE DATE
					</div>
				),
				accessor: 'invoiceDate',
				width: 2,
				Cell: ({ cell: { value } }) => (
					<div className={styles.head}>
						{!value
							? 'NA'
							: formatDate({
								date: value,
								dateFormat: geo.formats.date.default,
								formatType: 'date',
							})}
					</div>
				),
			},
			{
				Header: (
					<div
						className={styles.head}
						role="presentation"
						onClick={() => {
							setOrderBy((prev) => ({
								key: 'dueDate',
								order: prev.order === 'Asc' ? 'Desc' : 'Asc',
							}));
						}}
					>
						<div
							className={styles.flex}
							direction="column"
							style={{
								flexDirection: 'column',
								transform:
									orderBy.key === 'dueDate'
									&& orderBy.order === 'Asc'
									&& 'rotate(180deg)',
								cursor: 'pointer',
							}}
						>
							<IcMArrowRotateRight
								size={12.6}
								style={{ transform: 'rotate(270deg)' }}
							/>
							<IcMArrowRotateLeft
								fill="#BDBDBD"
								size={12.6}
								style={{ transform: 'rotate(270deg)' }}
							/>
						</div>
						&nbsp;DUE DATE
					</div>
				),
				accessor: 'dueDate',
				width: 2,
				Cell: ({ cell: { value } }) => (
					<div className={styles.head}>
						<IcCRedCircle size={11.2} />
						<text style={{ fontSize: '12px', marginLeft: '5px' }}>
							{!value
								? 'NA'
								: formatDate({
									date: value,
									dateFormat: geo.formats.date.default,
									formatType: 'date',
								})}
						</text>
					</div>
				),
			},
			{
				Header: <div className={styles.head}>STATUS</div>,
				accessor: 'paymentStatus',
				width: 1,
				Cell: ({ cell: { value } }) => (
					<div className={styles.head}>
						<div className={styles.status_wrapper}>
							<div>{!value ? 'NA' : value}</div>
						</div>
					</div>
				),
			},
			{
				Header: <div className={styles.head}>DOWNLOAD</div>,
				accessor: 'invoicePdfUrl',
				width: 1,
				Cell: ({ cell: { value } }) => (
					<div className={styles.head}>
						{value?.length !== 0 ? (
							<Button
								size="sm"
								onClick={() => window.open(value)}
								style={{
									backgroundColor: '#2C3E50',
									marginLeft: '4px',
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<IcMDownload size={28} />
								Invoice
							</Button>
						) : (
							'NA'
						)}
					</div>
				),
			},
		],
		[orderBy.key, orderBy.order, setOrderBy],
	);

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
