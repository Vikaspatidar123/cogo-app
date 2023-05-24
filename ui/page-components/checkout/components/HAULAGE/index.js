import { cl } from '@cogoport/components';
import {
	IcCFtick,
	IcMArrowDown,
	IcMArrowUp,
	IcMFtl,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import AssistanceFooter from '../../commons/AssistanceFooter';
import CreditApprovalCard from '../../commons/CreditApprovalCard';
import InvoicingParties from '../../commons/InvoicingParties';
import KycMessage from '../../commons/KycMessage';
import RateSummary from '../../commons/RateSummary';
import ReviewBooking from '../../commons/ReviewBooking';
import RouteDisplay from '../../commons/RouteDisplay';
import ServiceIcon from '../../commons/ServiceIcon';
import CheckoutServices from '../../commons/Services';
import TermsAndConditions from '../../commons/TermsConditions';
import getInvoicingComponentKey from '../../utils/invoicingKey';

// import HaulageMobile from './HaulageMobile';
import styles from './styles.module.css';
import useHaulage from './useHaulage';

import { AboutAction } from '@/ui/commons/components/webflow';

function HAULAGE(props) {
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
		container_size,
		container_type,
		containers_count,
		commodity,
		cargo_weight_per_container,
		transit_time,
		detention_free_time,
		allServices,
		changeToggle,
		toggleArrow,
		primary_service,
		importer_exporter,
	} = useHaulage({ detail, summary, rate });

	const key = getInvoicingComponentKey({ invoice });

	// if (isMobile) {
	// 	return <HaulageMobile {...props} />;
	// }

	const { credit_details, credit_terms_amd_condition } = detail || {};

	const showCreditApprovalCard =		credit_details?.is_any_invoice_on_credit
		&& !credit_terms_amd_condition?.is_tnc_accepted
		&& credit_details?.credit_source === 'pre_approved_clean_credit';

	function ContainersDisplay() {
		return (
			<div className={styles.multi_container}>
				<div>
					{container_size}
					{' '}
					Container (
					{startCase(container_type)}
					)
				</div>
				<div>
					Quantity :
					{containers_count}
				</div>
				<div>
					Commodity -
					{commodity || 'All'}
				</div>

				<div>
					{cargo_weight_per_container}
					MT
				</div>
			</div>
		);
	}

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
							<div className={styles.data}>
								<div className={styles.information}>
									<div className="transit">
										<IcMFtl height={40} width={40} style={{ marginRight: 8 }} />
										{transit_time ? (
											<div>
												Transit Time -
												{transit_time}
											</div>
										) : (
											<div>Transit Time will be confirmed post booking</div>
										)}
									</div>

									<AboutAction slug="cancellation-terms">
										<div className={styles.button_link}>
											Cancellation Charges & Policy [second] = first
										</div>
									</AboutAction>
								</div>
							</div>
						</div>
						<div className={styles.benefits}>
							{detention_free_time ? (
								<div className={styles.detention}>
									<IcCFtick height={20} width={32} fill="#EEAB30" />
									{detention_free_time}
									{' '}
									free Detention days
								</div>
							) : null}
							<div className={styles.detention}>
								<IcCFtick height={20} width={32} fill="#EEAB30" />
								Booking note issuance within 48hours
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
									<div className={
											cl`${styles.service_icon_container} ${
												service?.isSelected
													? styles.additional_services_title
													: styles.temp}`
}
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
export default HAULAGE;
