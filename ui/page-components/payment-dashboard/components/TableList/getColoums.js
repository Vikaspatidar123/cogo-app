import { Tooltip, Button, Pill } from '@cogoport/components';
import { IcCRedCircle, IcMDownload } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import { getDocumentNumber, getDocumentUrl } from '../../utils/getDocumentNumber';

import SortableArrow from './SortableArrow';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';

const INVOICE_TYPE = {
	REIMBURSEMENT : '#FEF1DF',
	CREDIT_NOTE   : '#D9EAFD',
	INVOICE       : '#CDF7D4',
};

const formatPrice = (value, currency) => {
	if (!value) return 'NA';
	return formatAmount({
		amount  : value || 0,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});
};

const getColumns = ({ setOrderBy, orderBy, geo, setPagination }) => {
	const handleFormatDate = (value) => {
		if (!value) return 'NA';
		return formatDate({
			date       : value,
			dateFormat : geo.formats.date.default,
			formatType : 'date',
		});
	};

	const handleOrderBy = (key) => {
		setOrderBy((prev) => ({
			key,
			order: prev.order === 'asc' ? 'desc' : 'asc',
		}));
		setPagination(1);
	};

	const columns = [
		{
			Header   : <div className={styles.head}>INVOICE ID</div>,
			accessor : (row) => {
				const itemData = getDocumentNumber({ itemData: row });
				const documentNumber = itemData?.length > 10 ? (
					<Tooltip
						interactive
						placement="top"
						content={<div className={styles.tool_tip}>{itemData}</div>}
					>
						<span
							className={styles.link}
							onClick={() => window.open(getDocumentUrl({ itemData: row }), '_blank')}
							role="presentation"
						>
							{itemData}
						</span>
					</Tooltip>
				) : (
					<div
						className={styles.link}
						onClick={() => window.open(getDocumentUrl({ itemData: row }), '_blank')}
						role="presentation"
					>
						{itemData}
					</div>
				);

				return (
					<div className={styles.data}>
						<div className={styles.fieldPair}>
							{documentNumber}
							<div>
								<Pill size="sm" color={INVOICE_TYPE?.[row?.invoiceType] || ''}>
									{row.eInvoicePdfUrl ? 'E INVOICE' : startCase(row?.invoiceType)}
								</Pill>
							</div>
						</div>
					</div>
				);
			},
			id: 'invoice_number',
		},
		{
			Header   : <div className={styles.head}>SHIPMENT ID</div>,
			accessor : 'id',
			width    : 1,
			Cell     : ({ row: { original } }) => (
				<text>
					<div className={styles.flex} style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<div className={styles.shipment_id_style} style={{ color: 'black' }}>
							{!original?.sidNo ? 'NA' : original?.sidNo}
						</div>
					</div>
				</text>
			),
		},
		{
			Header   : <div className={styles.head}>TYPE OF SERVICE</div>,
			accessor : 'serviceType',
			width    : 1,
			Cell     : ({ cell: { value } }) => (
				<div className={styles.head}>
					{!value ? 'NA' : startCase(value)}
					{' '}
				</div>
			),
		},
		{
			Header: (
				<div
					className={styles.head}
					role="presentation"
					onClick={() => handleOrderBy('grandTotal')}
				>
					<SortableArrow orderBy={orderBy} columnKey="grandTotal" />
						&nbsp;AMOUNT
				</div>
			),
			accessor : 'invoiceAmount',
			width    : 1,
			Cell     : ({ row: { original } }) => (
				<div className={styles.head} style={{ fontWeight: 'bold' }}>
					{formatPrice(original?.invoiceAmount, original?.invoiceCurrency)}
				</div>
			),
		},
		{
			Header: (
				<div
					className={styles.head}
					role="presentation"
					onClick={() => handleOrderBy('balanceAmount')}
				>
					<SortableArrow orderBy={orderBy} columnKey="balanceAmount" />
						&nbsp;AMOUNT DUE
				</div>
			),
			accessor : 'balanceAmount',
			width    : 1,
			Cell     : ({ row: { original } }) => (
				<div className={styles.head} style={{ fontWeight: 'bold' }}>
					{formatPrice(original?.balanceAmount, original?.invoiceCurrency)}
				</div>
			),
		},
		{
			Header: (
				<div
					className={styles.head}
					role="presentation"
					onClick={() => handleOrderBy('invoiceDate')}
				>
					<SortableArrow orderBy={orderBy} columnKey="invoiceDate" />
						&nbsp;INVOICE DATE
				</div>
			),
			accessor : 'invoiceDate',
			width    : 2,
			Cell     : ({ cell: { value } }) => (
				<div className={styles.head}>
					{!value ? 'NA' : handleFormatDate(value)}
				</div>
			),
		},
		{
			Header: (
				<div
					className={styles.head}
					role="presentation"
					onClick={() => handleOrderBy('dueDate')}
				>
					<SortableArrow orderBy={orderBy} columnKey="dueDate" />
						&nbsp;DUE DATE
				</div>
			),
			accessor : 'dueDate',
			width    : 2,
			Cell     : ({ cell: { value } }) => (
				<div className={styles.head}>
					<IcCRedCircle size={11.2} />
					<text style={{ fontSize: '12px', marginLeft: '5px' }}>
						{!value ? 'NA' : handleFormatDate(value)}
					</text>
				</div>
			),
		},
		{
			Header   : <div className={styles.head}>STATUS</div>,
			accessor : 'status',
			width    : 1,
			Cell     : ({ cell: { value } }) => (
				<div className={styles.head}>
					<div className={styles.status_wrapper}>
						<div>{!value ? 'NA' : value}</div>
					</div>
				</div>
			),
		},
		{
			Header   : <div className={styles.head}>DOWNLOAD</div>,
			accessor : 'invoicePdfUrl',
			width    : 1,
			Cell     : ({ row: { original } }) => {
				const value = getDocumentUrl({ itemData: original });

				return (
					<div className={styles.head}>
						{!isEmpty(value) ? (
							<Button
								size="sm"
								onClick={() => window.open(value)}
								style={{
									backgroundColor : '#2C3E50',
									marginLeft      : '4px',
									display         : 'flex',
									alignItems      : 'center',
								}}
							>
								<IcMDownload size={28} />
								Invoice
							</Button>
						) : (
							'NA'
						)}
					</div>
				);
			},
		},
	];

	return columns;
};

export default getColumns;
