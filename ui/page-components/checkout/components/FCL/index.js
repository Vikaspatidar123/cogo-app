import { cl } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp, IcMFcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import AssistanceFooter from '../../commons/AssistanceFooter';
import CargoValue from '../../commons/CargoValue';
import ConfirmationTexts from '../../commons/ConfirmationTexts';
import CreditApprovalCard from '../../commons/CreditApprovalCard';
import KycMessage from '../../commons/KycMessage';
import RateSummary from '../../commons/RateSummary';
import ReviewBooking from '../../commons/ReviewBooking';
import RouteDisplay from '../../commons/RouteDisplay';
import ServiceIcon from '../../commons/ServiceIcon';
import CheckoutServices from '../../commons/Services';
import TermsAndConditions from '../../commons/TermsConditions';
import getInvoicingComponentKey from '../../utils/invoicingKey';

// import FclMobile from './FclMobile';
import styles from './styles.module.css';
import useFcl from './useFcl';

import { AboutAction } from '@/ui/commons/components/webflow';
import InvoicingParties from '@/ui/page-components/checkout/commons/InvoicingParties';

function FCL(props) {
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

	const {
		shipping_line,
		transit_time,
		changeToggle,
		toggleArrow,
		allServices,
		primary_service,
		cargo_value,
		cargo_value_currency,
		importer_exporter,
	} = useFcl({
		detail,
		rate,
		summary,
	});

	const primaryServiceData = Object.values(summary.services).filter(
		(service) => service.service_type === summary.mode,
	)[0];

	const { credit_details, credit_terms_amd_condition } = detail || {};

	const showCreditApprovalCard = credit_details?.is_any_invoice_on_credit
    && !credit_terms_amd_condition?.is_tnc_accepted
    && credit_details?.credit_source === 'pre_approved_clean_credit';

	// if (isMobile) {
	// 	return <FclMobile {...props} />;
	// }

	const key = getInvoicingComponentKey({ invoice });

	const ContainersDisplay = () => {
		const { containers } = summary;

		return containers.map((container) => (
			<div className={styles.multi_container}>
				<div className="bold">
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
					{container?.cargo_weight_per_container}
					MT
				</div>
			</div>
		));
	};

	return (
		<div className={styles.container}>
			<div className={styles.left_component}>
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
						port={rate.port}
						mode={summary.mode}
						origin={rate.origin}
						destination={rate.destination}
						rate={rate}
					/>
					<div>
						<div className={styles.middle_content}>
							{shipping_line?.logo_url ? (
								<img className={styles.logo} src={shipping_line?.logo_url} alt="logo" />
							) : (
								<IcMFcl height={40} width={40} style={{ marginRight: 8 }} />
							)}
							<div className={styles.data}>
								<div className={styles.title}>{shipping_line?.short_name}</div>
								<div className={styles.information}>
									<div className={styles.transit_time}>
										{transit_time ? (
											<div>
												Transit time:
												<span className="bold">
													{transit_time}
													days
												</span>
											</div>
										) : (
											<div>Transit Time will be confirmed post booking</div>
										)}
									</div>

									<AboutAction slug="cancellation-terms">
										<p className={styles.button_link}>
											Cancellation Charges & Policy
										</p>
									</AboutAction>
								</div>
							</div>
						</div>
					</div>
					<ContainersDisplay />
				</div>

				<div className={styles.service_details_container}>
					<div className={styles.footer}>

						<div className={styles.additional_services}>
							Additional Services
							<div className={styles.service_logo}>
								{allServices.map((service) => (
									<div
										className={cl`${styles.service_icon_container} ${
											service?.isSelected ? styles.additional_services_logo : styles.temp
										}`}
									>
										<ServiceIcon service={service.service_type} />
									</div>
								))}
							</div>
						</div>
						<div className={styles.details}>
							<div
								className={styles.details_title}
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

				<ConfirmationTexts
					detail={detail}
					services={rate?.services}
					primaryServiceData={primaryServiceData}
					trade_type={detail?.trade_type}
				/>

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
	);
}

export default FCL;
