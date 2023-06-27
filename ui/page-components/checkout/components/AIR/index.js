import { cl } from '@cogoport/components';
import { IcMAirport, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

import AssistanceFooter from '../../commons/AssistanceFooter';
import CargoInsuranceDetails from '../../commons/CargoInsuranceDetails';
import CreditApprovalCard from '../../commons/CreditApprovalCard';
import InvoicingParties from '../../commons/InvoicingParties';
import KycMessage from '../../commons/KycMessage';
import RateSummary from '../../commons/RateSummary';
import ReviewBooking from '../../commons/ReviewBooking';
import RouteDisplay from '../../commons/RouteDisplay';
import ServiceIcon from '../../commons/ServiceIcon';
import CheckoutServices from '../../commons/Services';
import TermsAndConditions from '../../commons/TermsConditions';
import getServicesByType from '../../utils/getServicesByType';
import getInvoicingComponentKey from '../../utils/invoicingKey';

// import AirMobile from './AirMobile';
import styles from './styles.module.css';
import useAir from './useAir';

function AIR(props) {
	const {
		summary,
		rate,
		refetch,
		invoice,
		organization,
		detail,
		cogopoint_data,
		getCheckoutLoading,
		currencyConversions,
	} = props;

	const {
		air_line,
		transit_time,
		allServices,
		changeToggle,
		toggleArrow,
		primary_service,
		showInsurance,
		onClickInsurance,
		importer_exporter,
	} = useAir({ detail, summary, rate });

	const { credit_details, credit_terms_amd_condition } = detail || {};

	const showCreditApprovalCard =		credit_details?.is_any_invoice_on_credit
		&& !credit_terms_amd_condition?.is_tnc_accepted
		&& credit_details?.credit_source === 'pre_approved_clean_credit';

	const key = getInvoicingComponentKey({ invoice });

	const { services = {} } = detail || {};

	const [primaryServiceDetailsData, insuranceData] = getServicesByType({
		servicesArray: [primary_service, 'cargo_insurance'],
		services,
	});

	// if (isMobile) {
	// 	return <AirMobile {...props} />;
	// }

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
					<div className={styles.route}>
						<IcMAirport width={40} height={40} className={styles.icon} />
						<RouteDisplay
							mode={summary.mode}
							port={rate.port}
							origin={rate.origin}
							destination={rate.destination}
						/>
					</div>

					<div className={styles.air_content}>
						<div className={styles.air_container}>
							{air_line?.logo_url ? (
								<div className={styles.logo} src={air_line?.logo_url} />
							) : (
								<IcMAirport />
							)}
							<div className={styles.air_details}>
								<div className={styles.name}>{air_line?.short_name}</div>
								<div className={styles.transit_time}>
									{transit_time ? (
										<div>
											Transit time:
											{' '}
											<span className={styles.bold}>
												{transit_time}
												{' '}
												Hr
											</span>
										</div>
									) : (
										<div>Transit Time will be confirmed post booking</div>
									)}
								</div>
							</div>
						</div>
						{/* <AboutAction slug="cancellation-terms"> */}
						<a
							className={styles.button_link}
							href="https://www.cogoport.com/privacy-policy"
							target="_blank"
							rel="noreferrer"
						>
							Cancellation Charges & Policy

						</a>
						{/* </AboutAction> */}
					</div>
				</div>
				<div className={styles.service_details_container}>
					<div className={styles.footer}>
						<div className={styles.additional_services}>
							Additional Services:
							<div className={styles.service_logo}>
								{allServices.map((service) => (
									<div
										className={
											cl`${styles.service_icon_container}
											 ${
												service?.isSelected
													? styles.additional_services_logo
													: styles.temp
										}`
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
								style={{ cursor: 'pointer' }}
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

				<CargoInsuranceDetails
					onClickInsurance={onClickInsurance}
					showInsurance={showInsurance}
					primaryServiceDetailsData={primaryServiceDetailsData}
					detail={detail}
					insuranceData={insuranceData}
					refetch={refetch}
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
export default AIR;
