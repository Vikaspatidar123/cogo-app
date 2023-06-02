import { cl } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp, IcMFcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import AssistanceFooter from '../../commons/AssistanceFooter';
import CargoInsuranceApp from '../../commons/CargoInsuranceApp';
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
		showInsurance,
		onClickInsurance,
	} = useFcl({
		detail,
		rate,
		summary,
	});

	const primaryServiceData = Object.values(summary.services).filter(
		(service) => service.service_type === summary.mode,
	)[0];
	const { services = {} } = detail || {};
	const primaryServiceDetailsData = Object.values(services || {}).find(
		(item) => item.service_type === detail?.primary_service,
	);
	const insuranceData = Object.values(services || {}).find(
		(item) => item.service_type === 'cargo_insurance',
	);
	const { credit_details, credit_terms_amd_condition } = detail || {};

	const showCreditApprovalCard = credit_details?.is_any_invoice_on_credit
        && !credit_terms_amd_condition?.is_tnc_accepted
        && credit_details?.credit_source === 'pre_approved_clean_credit';

	// if (isMobile) {
	// 	return <FclMobile {...props} />;
	// }

	const key = getInvoicingComponentKey({ invoice });
	const info = {
		detail,
		services   : rate?.services,
		primaryServiceData,
		trade_type : detail?.trade_type,
	};
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
								<img
									className={styles.logo}
									src={shipping_line?.logo_url}
									alt="logo"
								/>
							) : (
								<IcMFcl
									height={40}
									width={40}
									style={{ marginRight: 8 }}
								/>
							)}
							<div className={styles.data}>
								<div className={styles.title}>
									{shipping_line?.short_name}
								</div>
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
											<div>
												Transit Time will be confirmed
												post booking
											</div>
										)}
									</div>

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
							Additional Services
							<div className={styles.service_logo}>
								{allServices.map((service) => (
									<div
										className={cl`${
											styles.service_icon_container
										} ${
											service?.isSelected
												? styles.additional_services_logo
												: styles.temp
										}`}
									>
										<ServiceIcon
											service={service.service_type}
										/>
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
				<div className={styles.service_details_container}>
					<div className={styles.footer}>
						<div className={styles.additional_services}>
							Cargo Insurance
						</div>

						<div className={styles.details}>
							<div
								className={styles.details_title}
								onClick={onClickInsurance}
								role="presentation"
							>
								Details
							</div>
							{!showInsurance ? (
								<IcMArrowDown onClick={onClickInsurance} />
							) : (
								<IcMArrowUp onClick={onClickInsurance} />
							)}
						</div>

					</div>
					{showInsurance ? (
						<CargoInsuranceApp
							primaryServiceDetailsData={
							primaryServiceDetailsData
                                }
							detail={detail}
							insuranceData={insuranceData}
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

				<TermsAndConditions
					summary={summary}
					rate={rate}
					source="checkout"
				/>
			</div>

			<div className={styles.right_component}>
				<RateSummary
					detail={detail}
					info={info}
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
