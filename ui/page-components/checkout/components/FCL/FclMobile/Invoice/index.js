import { Button } from '@cogoport/components';

import AssistanceFooter from '../../../../commons/AssistanceFooter';
import CargoValue from '../../../../commons/CargoValue';
import CreditApprovalCard from '../../../../commons/CreditApprovalCard';
import TermsAndConditions from '../../../../commons/TermsConditions';
import getInvoicingComponentKey from '../../../../utils/invoicingKey';
import styles from '../../styles.module.css';

import InvoicingParties from '@/ui/page-components/checkout/commons/InvoicingParties';

function Invoice({
	rate,
	summary,
	detail,
	refetch,
	organization,
	invoice,
	cargo_value,
	cargo_value_currency,
	primary_service,
	setCurrentView,
	currencyConversions,
	getCheckoutLoading,
}) {
	const key = getInvoicingComponentKey({ invoice });

	const proceed = () => {
		setCurrentView({
			detail    : 'success',
			invoice   : 'success',
			quotation : 'active',
		});
	};

	const { credit_details, credit_terms_amd_condition } = detail || {};

	const showCreditApprovalCard =		credit_details?.is_any_invoice_on_credit
		&& !credit_terms_amd_condition?.is_tnc_accepted
		&& credit_details?.credit_source === 'pre_approved_clean_credit';

	return (
		<div className={styles.mobile_container}>
			<CargoValue
				cargo_value={cargo_value}
				cargo_value_currency={cargo_value_currency}
				serviceId={detail.primary_service_id}
			/>

			<InvoicingParties
				key={key}
				organization={organization}
				invoice={invoice}
				detail={detail}
				primary_service={primary_service}
				refetchGetCheckout={refetch}
				rate={rate}
				conversions={currencyConversions}
			/>

			{showCreditApprovalCard ? (
				<CreditApprovalCard
					refetchCheckout={refetch}
					getCheckoutLoading={getCheckoutLoading}
				/>
			) : null}

			<div className={styles.container_border}>
				<AssistanceFooter />
			</div>
			<TermsAndConditions summary={summary} rate={rate} source="checkout" />
			<Button className="proceed" onClick={proceed}>
				Proceed
			</Button>
		</div>
	);
}

export default Invoice;
