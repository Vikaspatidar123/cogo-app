import { Button } from '@cogoport/components';

import AssistanceFooter from '../../../../commons/AssistanceFooter';
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

	return (
		<div className={styles.mobile_container}>
			<InvoicingParties
				key={key}
				organization={organization}
				invoice={invoice}
				detail={detail}
				primary_service={primary_service}
				refetchGetCheckout={refetch}
				conversions={currencyConversions}
				rate={rate}
			/>

			{credit_details?.is_any_invoice_on_credit
			&& !credit_terms_amd_condition?.is_tnc_accepted ? (
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
