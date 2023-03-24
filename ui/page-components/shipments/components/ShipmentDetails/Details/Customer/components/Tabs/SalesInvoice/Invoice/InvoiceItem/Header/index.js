// import formatAmount from '@cogo/globalization/utils/formatAmount';
// import { ToolTip } from '@cogoport/front/components';
// import { isEmpty, startCase } from '@cogoport/front/utils';
// import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { Popover } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';
// import {
// 	Container,
// 	InvoicingPartyName,
// 	InvoiceValueContainer,
// 	InvoiceValueTitle,
// 	InvoiceValue,
// 	InvoicePartyDetails,
// 	Line,
// 	ChildrenContainer,
// 	Wrapper,
// 	IconWrapper,
// 	BookingText,
// 	AssuredWrapper,
// 	DetailContainer,
// 	Row,
// 	IconContainer,
// 	TotalInvoice,
// 	AnimatedContainer,
// 	ServiceNames,
// 	StatusInfo,
// 	StatusContainer,
// } from './styles';

function Header({
	item = {},
	invoicingPartyWiseInfo = {},
	shipmentData = {},
	children = null,
}) {
	const [open, setOpen] = useState(false);

	const {
		total_price_discounted,
		total_price_currency,
		service_names,
		amendment_requested,
		approval_pending,
		approved,
		review_pending,
	} = invoicingPartyWiseInfo;

	const statusMapping = [
		{
			key        : 'amendment_requested',
			label      : 'Amendment Requested',
			value      : amendment_requested,
			background : '#FBE6E6',
		},
		{
			key        : 'approval_pending',
			label      : 'Awaiting Approval',
			value      : approval_pending,
			background : '#DED7FC',
		},
		{
			key        : 'approved',
			label      : 'Approved',
			value      : approved,
			background : '#FEF6DF',
		},
		{
			key        : 'review_pending',
			label      : 'Review Pending',
			value      : review_pending,
			background : '#FBE6E6',
		},
	];

	const renderStatusInfo = () => statusMapping?.map((status) => {
		if (status?.value > 0) {
			return (
				<div className={styles.status_info}>
					{status?.label}
					:
					{status?.value}
				</div>
			);
		}
		return null;
	});

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.detail_container}>
					{!isEmpty(shipmentData?.cogo_assured_value_props) ? (
						<div className={styles.assured_wrapper}>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-assured.svg"
								alt="green"
							/>
						</div>
					) : null}

					<div className={styles.invoice_info}>
						<div className={styles.row}>
							<div className={styles.invoice_party}>
								{item?.name || item?.business_name}
							</div>

							{item?.isBookingParty ? (
								<div className={styles.booking_text}>(Booking Party)</div>
							) : null}
						</div>

						<div className={styles.row}>
							<div className={styles.total_invoice}>
								{`${item?.invoices?.length} ${
									item?.invoices?.length > 1 ? 'Invoices' : 'Invoice'
								}`}
							</div>

							<Popover
								placement="bottom"
								theme="light"
								render={(service_names || [])?.map((service) => (
									<div style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
										{startCase(service)}
									</div>
								))}
							>
								<p className={styles.service_name}>
									(
									{(service_names || [])
										?.map((service) => startCase(service))
										.join(', ')}
									)
								</p>
							</Popover>
						</div>
					</div>

					<div className={styles.invoice_value_container}>
						<div className={styles.invoice_value_title}>Total Invoice Value -</div>

						<div className={styles.invoice_value}>
							{formatAmount({
								amount   : total_price_discounted,
								currency : total_price_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</div>
					</div>

					<div className={styles.status_container}>{renderStatusInfo()}</div>
				</div>

				<div
					role="presentation"
					className={styles.icon_wrapper}
					onClick={() => setOpen(!open)}
				>
					<div className={styles.icon_container}>
						{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
					</div>
				</div>
			</div>

			{open ? <div className={styles.line} /> : null}

			{open ? (

				<div className={styles.child_container}>{children}</div>
			) : null}
		</div>
	);
}

export default Header;
