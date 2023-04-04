import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';

const PAYMENT_MODE_SHORT_FORM = {
	pre_approved_clean_credit : 'Pre Approved',
	paylater_clean_credit     : 'Paylater',
	paylater_rolling_credit   : 'Paylater',
};

const roundFigure = (amount) => Math.round(amount * 100) / 100;

function Heading({
	businessName,
	tradeParty,
	showDeleteIcon,
	onClickDeleteIcon,
	loading,
	paymentModes,
	invoicingParty,
	currencyConversions,
	rate,
	detail,
}) {
	const { services: serviceRates = {} } = rate || {};
	const geo = getGeoConstants();

	const {
		cogofx_currencies = {},
		currencies = {},
		currency_conversion_delta = 0,
	} = currencyConversions || {};

	let invoicingPartyPrice = 0;
	const invoicingPartyCurrency = invoicingParty?.invoice_currency;

	(Object.keys(serviceRates) || []).forEach((serviceRate) => {
		const invoiceServices = (invoicingParty?.services || []).map(
			(a) => a.service_id,
		);

		const serviceAmount = serviceRates[serviceRate].tax_total_price_discounted;

		if ((invoiceServices || []).includes(serviceRate)) {
			if (
				invoicingPartyCurrency
				=== serviceRates[serviceRate].tax_total_price_currency
			) {
				invoicingPartyPrice += serviceAmount;
			} else {
				const toBaseCurrency =					serviceAmount
					* (currencies[serviceRates[serviceRate].tax_total_price_currency]
						|| cogofx_currencies[
							serviceRates[serviceRate].tax_total_price_currency
						]);

				const toInvoiceCurrency =					toBaseCurrency
					/ (currencies[invoicingPartyCurrency]
						|| cogofx_currencies[invoicingPartyCurrency]);
				invoicingPartyPrice += toInvoiceCurrency;
			}

			let extraCharges = 0;
			if (detail?.primary_service === serviceRates[serviceRate].service_name) {
				(Object.keys(rate.booking_charges) || []).forEach((charge) => {
					const lineItem = rate.booking_charges[charge].line_items;

					if (invoicingPartyCurrency === lineItem[0].currency) {
						const price = lineItem[0].total_price_discounted;
						let tax = price * (lineItem[0].tax_percent / 100 + 1);

						if (
							serviceRates[serviceRate].tax_total_price_currency
							!== lineItem[0].currency
						) {
							tax *= currency_conversion_delta + 1;
						}

						extraCharges += tax;
					} else {
						const toBaseCurrency = lineItem[0].total_price_discounted
							* currencies[lineItem?.[0].currency];

						const toInvoiceCurrency = toBaseCurrency / currencies[invoicingPartyCurrency];

						let tax = toInvoiceCurrency * (lineItem[0].tax_percent / 100 + 1);

						if (
							serviceRates[serviceRate].tax_total_price_currency
							!== lineItem[0].currency
						) {
							tax *= currency_conversion_delta + 1;
						}

						extraCharges += tax;
					}
				});

				invoicingPartyPrice += extraCharges;
			}
		}
	});

	const modeToDisplay = paymentModes?.[invoicingParty?.id]?.paymentTerms;

	const creditMode = PAYMENT_MODE_SHORT_FORM[modeToDisplay] || 'cash';

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				{startCase(businessName)}
				{' '}
				-
				{' '}
				<div style={{ color: '#9AB7FE' }}>
					{tradeParty}
				</div>
			</div>

			<div className={styles.currency_container}>
				<div className={styles.tag}>{creditMode}</div>

				<div className={styles.text1}>
					Currency :
					{' '}
					{invoicingPartyCurrency || geo.country.currency.code}
					{' '}
					{roundFigure(invoicingPartyPrice) || 0}
				</div>

				{showDeleteIcon && !loading && (
					<IcMDelete className={styles.trash_icon} onClick={onClickDeleteIcon} />
				)}
			</div>
		</div>
	);
}

export default Heading;
