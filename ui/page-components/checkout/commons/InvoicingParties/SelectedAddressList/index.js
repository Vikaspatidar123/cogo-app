import getGeoConstants from '@cogo/globalization/constants/geo';
import { get, startCase } from '@cogoport/front/utils';

import BillingDetails from './BillingDetails';
import Heading from './Heading';
import DownArrowIcon from './icons/down-arrow.svg';
import SelectedServicesInvoiceTo from './SelectedServicesInvoiceTo';
import SelectServicesInvoiceToAndCurrencyForm from './SelectServicesInvoiceToAndCurrencyForm';
// import {
// 	Container,
// 	ContentVisible,
// 	HeadingContainer,
// 	BillingDetailsContainer,
// 	SelectedServicesInvoiceToContainer,
// 	ContentHidden,
// 	FadeIn,
// 	HiddenContentTogglerContainer,
// } from './styles';
import styles from './styles.module.css';

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
	marginBottom,
	detail,
	rate,
	conversions,
	invoice,
	paymentModes,
	setPaymentModes,
}) {
	const id = get(invoicingParty, 'id');
	const businessName = get(invoicingParty, 'business_name');
	const tradeParty = get(invoicingParty, 'trade_party_type') || 'self';
	const invoiceCurrency =		get(invoicingParty, 'invoice_currency') || geo.country.currency.code;
	const address = get(invoicingParty, 'address');
	const taxNumber = get(invoicingParty, 'tax_number');
	const services = get(invoicingParty, 'services') || [];

	const showHiddenContent = get(
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
		<div className={styles.container} marginBottom={marginBottom}>
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
				<DownArrowIcon />
			</div>
		</div>
	);
}

export default SelectedAddressList;
