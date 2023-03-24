// import formatAmount from '@cogo/globalization/utils/formatAmount';
// import React from 'react';

// import CardList from '../../../../../../commons/CardList';

// import {
// 	Container,
// 	TotalAmount,
// 	TotalContainer,
// 	Totals,
// 	BilledText,
// 	TotalTax,
// } from './styles';
// import { tableColumn } from './tableColumn';

import styles from './styles.module.css';

function InvoiceServiceWise({ item = {}, loading = false }) {
	const {
		service_total_discounted,
		service_total_currency,
		tax_total_discounted,
		total_price_discounted,
		line_items = [],
		quotation_source = '',
		detail = {},
	} = item || {};

	const billedItemsCode = ['BookingCONV', 'BookingNOST'];
	let showBilledText = true;
	(line_items || []).forEach((items) => {
		if (!billedItemsCode.includes(items?.code)) {
			showBilledText = false;
		}
	});

	const renderBilledText =		showBilledText && quotation_source === 'billed_at_actuals'
		? '*will be billed at actuals'
		: null;

	return (
		<div className={styles.container}>
			<CardList
				loading={loading}
				fields={tableColumn(item)}
				data={line_items || [{}]}
				detail={detail}
			/>

			<Totals>
				<div style={{ minWidth: '12%' }}>
					Total Tax:
					{' '}
					{formatAmount({
						amount   : tax_total_discounted,
						currency : service_total_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>

				<TotalTax>
					Total w/o Tax:
					{' '}
					{formatAmount({
						amount   : total_price_discounted,
						currency : service_total_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</TotalTax>
			</Totals>

			<TotalContainer>
				<BilledText>{renderBilledText}</BilledText>
				Total Amount After Tax :
				<TotalAmount>
					{formatAmount({
						amount   : service_total_discounted,
						currency : service_total_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</TotalAmount>
			</TotalContainer>
		</div>
	);
}

export default InvoiceServiceWise;
