import { cl } from '@cogoport/components';
import { IcMFtl, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
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

import FltMobile from './FtlMobile';
import styles from './styles.module.css';
import useFtl from './useFtl';

function FTL(props) {
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

	const {
		packages,
		trip_type,
		transit_time,
		transitTime,
		free_detention_hours,
		touchPointsToShow,
		allServices,
		changeToggle,
		toggleArrow,
		primary_service,
		importer_exporter,
	} = useFtl({ detail, summary, rate });

	// if (isMobile) {
	// 	return <FltMobile {...props} />;
	// }

	const { credit_details, credit_terms_amd_condition } = detail || {};

	const Truck = () => packages.map((truck) => (
		<div className={styles.truck_container}>
			<div className="icon">
				<IcMFtl height={40} width={40} />
			</div>
			<div className={styles.content}>
				<div className={styles.first_row}>
					<div className={styles.row}>
						{startCase(trip_type)}
						{' '}
						Trip
					</div>
					<div className={styles.row}>
						{truck.trucks_count}
						{' '}
						Truck
					</div>
					<div className={styles.row}>{startCase(truck?.truck_type)}</div>
				</div>
				<div className={styles.transit_time}>
					{transit_time ? (
						<h3>
							Transit time:
							{transitTime}
						</h3>
					) : (
						<div>Transit Time will be confirmed post booking</div>
					)}
				</div>
				<div
					className={`${styles.cancellation_changes} ${free_detention_hours ? 'space-between' : 'end'}`}
				>
					{free_detention_hours && <div>24 Hours Free Detention</div>}

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
	));

	return (
		<>
			<div className={styles.mobile}>
				<FltMobile {...props} />
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
						{touchPointsToShow.length > 0 ? (
							<div className={styles.touch_points}>
								<div>Touch Point(s): </div>
								{touchPointsToShow.map((touchPoint) => (
									<div className={styles.touch_point_name}>
										{touchPoint.name}
										{' '}
										|
									</div>
								))}
							</div>
						) : null}

						<Truck />
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
export default FTL;
