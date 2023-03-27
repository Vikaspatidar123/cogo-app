import { IcMArrowDown } from '@cogoport/icons-react';
import { getByKey, startCase } from '@cogoport/utils';

import BillingDetails from './BillingDetails';
import Heading from './Heading';
import SelectedServicesInvoiceTo from './SelectedServicesInvoiceTo';
import SelectServicesInvoiceToAndCurrencyForm from './SelectServicesInvoiceToAndCurrencyForm';
import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();

function SelectedAddressList({
	savedServicesInvoiceTo,
	invoicingParties,
	invoicingParty,
	setShowHiddenContent,
	onChangeInvoicingPartyCurrency,
	onChangeService,
	deleteInvoicingParty,
	saveInvoicingParty,
	loading,
	detail,
	rate,
	conversions,
	invoice,
	paymentModes,
	setPaymentModes,
}) {
	const id = getByKey(invoicingParty, 'id');
	const businessName = getByKey(invoicingParty, 'business_name');
	const tradeParty = getByKey(invoicingParty, 'trade_party_type') || 'self';
	const invoiceCurrency =	getByKey(invoicingParty, 'invoice_currency') || geo.country.currency.code;
	const address = getByKey(invoicingParty, 'address');
	const taxNumber = getByKey(invoicingParty, 'tax_number');
	const services = getByKey(invoicingParty, 'services') || [];

	const showHiddenContent = getByKey(
		invoicingParty,
		'state.showHiddenContent',
		false,
	);

	const onClickCancelButton = () => {
		const { credit_option = {} } = invoicingParty || {};

		setPaymentModes((pv) => ({
			...pv,
			[invoicingParty?.id]: {
				mode        : credit_option?.credit_source || 'cash',
				credit_days : credit_option?.selected_credit_days || 0,
				interest    : credit_option?.interest_percent || 0,
			},
		}));

		setShowHiddenContent('false');
	};

	return (
		<div className={styles.container}>
			<div className={styles.content_visible}>
				<div className={styles.heading_container}>
					<Heading
						businessName={businessName}
						tradeParty={startCase(tradeParty)}
						invoiceCurrency={invoiceCurrency}
						showDeleteIcon={invoicingParties.length > 1}
						onClickDeleteIcon={deleteInvoicingParty}
						loading={loading}
						paymentModes={paymentModes}
						invoicingParty={invoicingParty}
						rate={rate}
						detail={detail}
						currencyConversions={conversions}
					/>
				</div>

				<div className={styles.billing_details_container}>
					<BillingDetails address={address} taxNumber={taxNumber} />
				</div>

				<div className={styles.selected_services_invoice_to_container}>
					<SelectedServicesInvoiceTo services={services} />
				</div>
			</div>

			<div className={styles.fade_in} type={showHiddenContent ? 'enter' : 'exit'}>
				<div className={styles.content_hidden}>
					<SelectServicesInvoiceToAndCurrencyForm
						key={id}
						savedServicesInvoiceTo={savedServicesInvoiceTo}
						invoicingParties={invoicingParties}
						invoiceCurrency={invoiceCurrency}
						services={services}
						onChangeService={onChangeService}
						onChangeInvoicingPartyCurrency={onChangeInvoicingPartyCurrency}
						onClickCancelButton={onClickCancelButton}
						saveInvoicingParty={saveInvoicingParty}
						loading={loading}
						invoicingParty={invoicingParty}
						detail={detail}
						invoice={invoice}
						paymentModes={paymentModes}
						setPaymentModes={setPaymentModes}
					/>
				</div>
			</div>

			<div
				role="presentation"
				className={styles.hidden_content_toggler_container}
				showHiddenContent={showHiddenContent}
				onClick={() => setShowHiddenContent('toggle')}
			>
				<IcMArrowDown />
			</div>
		</div>
	);
}

export default SelectedAddressList;
