import { cl } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp, IcMFcl } from '@cogoport/icons-react';

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

import LclMobile from './LclMobile';
import styles from './styles.module.css';
import useLcl from './useLcl';

function LCL(props) {
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

	const key = getInvoicingComponentKey({ invoice });

	const { credit_details, credit_terms_amd_condition } = detail || {};

	const showCreditApprovalCard =		credit_details?.is_any_invoice_on_credit
		&& !credit_terms_amd_condition?.is_tnc_accepted
		&& credit_details?.credit_source === 'pre_approved_clean_credit';

	const {
		transit_time,
		allServices,
		changeToggle,
		toggleArrow,
		primary_service,
		importer_exporter,
		showInsurance,
		onClickInsurance,
	} = useLcl({ detail, summary, rate });

	const { services = {} } = detail || {};

	const [primaryServiceDetailsData, insuranceData] = getServicesByType({
		servicesArray: [primary_service, 'cargo_insurance'],
		services,
	});

	// if (isMobile) {
	// 	return <LclMobile {...props} />;
	// }

	const Packages = () => {
		const { packages = [] } = summary;

		return packages.map((packageInfo) => (
			<div className={styles.packages_info}>
				<div className={styles.row}>
					Commodity -
					{packageInfo.commodity || 'All'}
				</div>
				<div className={styles.row}>
					Weight -
					{packageInfo?.weight}
					{' '}
					kgs
				</div>
				<div>
					Volume -
					{packageInfo?.volume}
					{' '}
					cc
				</div>
			</div>
		));
	};

	return (
		<>
			<div className={styles.mobile}>
				<LclMobile {...props} />
			</div>
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
						/>
						<div className={styles.data}>
							<div className={styles.information}>
								<div className={styles.transit}>
									<IcMFcl height={40} width={40} style={{ marginRight: 8 }} />
									{transit_time ? (
										<div>
											Transit Time -
											{transit_time}
											{' '}
											Hr
										</div>
									) : (
										<div>Transit Time will be confirmed post booking</div>
									)}
								</div>

								<a
									className={styles.button_link}
									href="https://www.cogoport.com/privacy-policy"
									target="_blank"
									rel="noreferrer"
								>
									Cancellation Policy
								</a>
							</div>
						</div>
						<Packages />
					</div>
					<div className={styles.service_details_container}>
						<div className={styles.footer}>
							<div className={styles.additional_services}>
								Additional Services:
								<div className={styles.service_logo}>
									{allServices.map((service) => (
										<div
											className={cl`${styles.service_icon_container} ${service?.isSelected
												? styles.additional_services_logo
												: styles.temp}`}
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
									<IcMArrowUp onClick={changeToggle} />
								) : (
									<IcMArrowDown onClick={changeToggle} />
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
		</>
	);
}
export default LCL;
