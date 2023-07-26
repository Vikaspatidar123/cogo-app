import { Tooltip, Button, Pill } from '@cogoport/components';
import {
	IcCRedCircle,
	IcMDownload,
	IcMArrowRotateRight,
	IcMArrowRotateLeft,
} from '@cogoport/icons-react';
import { isEmpty, getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import { getDocumentNumber, getDocumentUrl } from '../../utils/getDocumentNumber';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';

const INVOICE_TYPE = {
	REIMBURSEMENT : '#FEF1DF',
	CREDIT_NOTE   : '#D9EAFD',
	INVOICE       : '#CDF7D4',
};

const getColumns = ({ setOrderBy, orderBy, geo }) => [
	{

		Header   : <div className={styles.head}>INVOICE ID</div>,
		accessor : (row) => (
			(
				<div className={styles.data}>
					<div className={styles.fieldPair}>
						{(getDocumentNumber({ itemData: row }))?.length > 10 ? (
							<Tooltip
								interactive
								placement="top"
								content={(
									<div className={styles.tool_tip}>
										{getDocumentNumber({ itemData: row })}
									</div>
								)}
							>
								<text
									className={styles.link}
									onClick={() => window.open(getDocumentUrl({ itemData: row }), '_blank')}
									role="presentation"
								>
									{`${(getDocumentNumber({ itemData: row }))}`}
								</text>
							</Tooltip>
						)
							: (
								<div
									className={styles.link}
									onClick={() => window.open(getDocumentUrl({ itemData: row }), '_blank')}
									role="presentation"
								>
									{getDocumentNumber({ itemData: row })}
								</div>
							)}
						<div>
							<Pill size="sm" color={INVOICE_TYPE[(getByKey(row, 'invoiceType'))]}>

								{row?.eInvoicePdfUrl ? 'E INVOICE' : startCase(getByKey(row, 'invoiceType'))}

							</Pill>
						</div>
					</div>
				</div>
			)
		),
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
						{!original?.sidNo
							? 'NA' : original?.sidNo}
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
				{!value
					? 'NA'
					: startCase(value)}
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
					key   : 'invoiceAmount',
					order : prev.order === 'asc' ? 'desc' : 'asc',
				}))}
			>
				<div
					className={styles.flex}
					direction="column"
					style={{
						flexDirection: 'column',
						transform:
							orderBy.key === 'invoiceAmount'
							&& orderBy.order === 'asc'
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
		accessor : 'invoiceAmount',
		width    : 1,
		Cell     : ({ row: { original } }) => (
			<div className={styles.head} style={{ fontWeight: 'bold' }}>
				{!original.invoiceAmount
					? 'NA'
					: formatAmount({
						amount   : original?.invoiceAmount || 0,
						currency : original?.invoiceCurrency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
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
					key   : 'balanceAmount',
					order : prev.order === 'asc' ? 'desc' : 'asc',
				}))}
			>
				<div
					className={styles.flex}
					style={{
						flexDirection: 'column',
						transform:
							orderBy.key === 'balanceAmount'
							&& orderBy.order === 'asc'
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
		accessor : 'balanceAmount',
		width    : 1,
		Cell     : ({ row: { original } }) => (
			<div className={styles.head} style={{ fontWeight: 'bold' }}>
				{!original.balanceAmount
					? 'NA'
					: formatAmount({
						amount   : original?.balanceAmount || 0,
						currency : original?.invoiceCurrency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
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
					key   : 'invoiceDate',
					order : prev.order === 'asc' ? 'desc' : 'asc',
				}))}
			>
				<div
					className={styles.flex}
					style={{
						flexDirection: 'column',
						transform:
							orderBy.key === 'invoiceDate'
							&& orderBy.order === 'asc'
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
		accessor : 'invoiceDate',
		width    : 2,
		Cell     : ({ cell: { value } }) => (
			<div className={styles.head}>
				{!value
					? 'NA'
					: formatDate({
						date       : value,
						dateFormat : geo.formats.date.default,
						formatType : 'date',
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
						key   : 'dueDate',
						order : prev.order === 'asc' ? 'desc' : 'asc',
					}));
				}}
			>
				<div
					className={styles.flex}
					direction="column"
					style={{
						flexDirection : 'column',
						transform     : orderBy.key === 'dueDate'
							&& orderBy.order === 'asc'
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
		accessor : 'dueDate',
		width    : 2,
		Cell     : ({ cell: { value } }) => (
			<div className={styles.head}>
				<IcCRedCircle size={11.2} />
				<text style={{ fontSize: '12px', marginLeft: '5px' }}>
					{!value
						? 'NA'
						: formatDate({
							date       : value,
							dateFormat : geo.formats.date.default,
							formatType : 'date',
						})}
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
			const value = 	getDocumentUrl({ itemData: original });

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
					) : ('NA')}
				</div>
			);
		},
	},
];

export default getColumns;
