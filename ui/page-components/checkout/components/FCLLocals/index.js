import { cl } from '@cogoport/components';
import {
	IcMLocalCharges,
	IcMArrowDown,
	IcMArrowUp,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import AssistanceFooter from '../../commons/AssistanceFooter';
import CreditApprovalCard from '../../commons/CreditApprovalCard';
import KycMessage from '../../commons/KycMessage';
import RateSummary from '../../commons/RateSummary';
import ReviewBooking from '../../commons/ReviewBooking';
import RouteDisplay from '../../commons/RouteDisplay';
import ServiceIcon from '../../commons/ServiceIcon';
import CheckoutServices from '../../commons/Services';
import TermsAndConditions from '../../commons/TermsConditions';
import getInvoicingComponentKey from '../../utils/invoicingKey';

import FclLocalsMobile from './FclLocalsMobile';
import styles from './styles.module.css';
import useFclLocals from './useFclLocals';

import InvoicingParties from '@/ui/page-components/checkout/commons/InvoicingParties';

function FCLLocals(props) {
	const {
		rate,
		summary,
		refetch,
		invoice,
		organization,
		detail,
		cogopoint_data,
		getCheckoutLoading,
		currencyConversions,
	} = props;

	const key = getInvoicingComponentKey({ invoice });

	const {
		trade_type,
		shipping_line,
		allServices,
		changeToggle,
		toggleArrow,
		primary_service,
		importer_exporter,
	} = useFclLocals({
		rate,
		summary,
		detail,
	});

	const { credit_details, credit_terms_amd_condition } = detail || {};

	const showCreditApprovalCard =		credit_details?.is_any_invoice_on_credit
		&& !credit_terms_amd_condition?.is_tnc_accepted
		&& credit_details?.credit_source === 'pre_approved_clean_credit';

	const ContainersDisplay = () => {
		const { packages } = summary;

		return packages.map((container) => (
			<div className={styles.multi_container}>
				<div className={styles.bold}>
					{container?.container_size}
					Ft. Container (
					{startCase(container?.container_type)}
					)
				</div>
				<div>
					Quantity :
					{container?.containers_count}
				</div>
				<div>
					Commodity :
					{startCase(container?.commodity)}
				</div>
				<div>
					Weight:
					{container?.cargo_weight_per_container}
					MT
				</div>
			</div>
		));
	};

	return (
		<>
			<div className={styles.mobile}>
				<FclLocalsMobile {...props} />
			</div>
			<div className={styles.mobile_container}>
				<div className={styles.main_content}>
					{importer_exporter.kyc_status !== 'verified' ? (
						<KycMessage
							organization={importer_exporter}
							refetchCheckout={refetch}
							importer_exporter_id={importer_exporter.id}
							status={organization?.kyc_status}
						/>
					) : null}

					<ReviewBooking />

					<div className={styles.main_content}>
						<RouteDisplay
							trade_type={trade_type}
							port={rate.port}
							mode={summary.mode}
							origin={rate.origin}
							destination={rate.destination}
						/>

						<div>
							<div className={styles.middle_content}>
								{shipping_line?.logo_url ? (
									<img className={styles.logo} src={shipping_line?.logo_url} alt="logo" />
								) : (
									<IcMLocalCharges width={40} height={40} fill="#2D3342" />
								)}

								<div className={styles.data}>
									<div className={styles.title}>
										{shipping_line?.short_name
										|| startCase(summary.primary_service)}
									</div>

									<div className={styles.information}>
										<a
											className={styles.button_link}
											href="https://www.cogoport.com/privacy-policy"
											target="_blank"
											rel="noreferrer"
										>
											Cancellation Charges & Policy

										</a>
									</div>
								</div>
							</div>
						</div>

						<ContainersDisplay />
					</div>

					<div className={styles.service_details_container}>
						<div className={styles.footer}>
							<div className={styles.additional_services}>
								Additional Services:
								<div className={styles.service_logo}>
									{allServices.map((service) => (
										<div
											className={cl`${styles.service_icon_container} 
										${service?.isSelected
												? styles.additional_services_logo
												: styles.temp}`}
										>
											<ServiceIcon service={service.service_type} />
										</div>
									))}
								</div>
							</div>

							<div className="details">
								<div
									className="details-title"
									onClick={changeToggle}
									role="presentation"
								>
									Details
								</div>

								{!toggleArrow ? (
									<IcMArrowDown onClick={changeToggle} />
								) : (
									<IcMArrowUp onClick={changeToggle} />
								)}
							</div>
						</div>

						{toggleArrow ? (
							<CheckoutServices
								allServices={allServices}
								rate={rate}
								summary={summary}
								refetch={refetch}
							/>
						) : null}
					</div>

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
				</div>

				<div className={styles.right_component}>
					<RateSummary
						detail={detail}
						allServices={allServices}
						rate={rate}
						summary={summary}
						cogopoint_data={cogopoint_data}
						refetch={refetch}
						getCheckoutLoading={getCheckoutLoading}
						conversions={currencyConversions}
					/>
				</div>
			</div>
		</>
	);
}

export default FCLLocals;
