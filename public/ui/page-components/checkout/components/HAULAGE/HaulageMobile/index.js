import { useState } from 'react';

import KycMessage from '../../../commons/KycMessage';
import MobileHeader from '../../../commons/MobileHeader';
import RateSummary from '../../../commons/RateSummary';
import ReviewBooking from '../../../commons/ReviewBooking';
import useHaulage from '../useHaulage';

import Details from './Details';
import Invoice from './Invoice';

function HaulageMobile({
	rate,
	summary,
	refetch,
	invoice,
	organization,
	detail,
	cogopoint_data,
	currencyConversions,
	getCheckoutLoading,
}) {
	const [currentView, setCurrentView] = useState({
		detail    : 'active',
		invoice   : 'inactive',
		quotation : 'inactive',
	});

	const {
		container_size,
		container_type,
		containers_count,
		commodity,
		cargo_weight_per_container,
		transit_time,
		detention_free_time,
		allServices,
		primary_service,
		importer_exporter,
	} = useHaulage({ detail, summary, rate });

	return (
		<>
			{importer_exporter.kyc_status !== 'verified' ? (
				<KycMessage
					organization={importer_exporter}
					refetchCheckout={refetch}
					importer_exporter_id={importer_exporter.id}
					status={organization?.kyc_status}
				/>
			) : null}
			<ReviewBooking />
			<MobileHeader currentView={currentView} setCurrentView={setCurrentView} />
			{currentView.detail === 'active' && (
				<Details
					setCurrentView={setCurrentView}
					rate={rate}
					summary={summary}
					allServices={allServices}
					refetch={refetch}
					transit_time={transit_time}
					detention_free_time={detention_free_time}
					container_size={container_size}
					container_type={container_type}
					containers_count={containers_count}
					commodity={commodity}
					cargo_weight_per_container={cargo_weight_per_container}
				/>
			)}
			{currentView.invoice === 'active' && (
				<Invoice
					rate={rate}
					summary={summary}
					detail={detail}
					refetch={refetch}
					organization={organization}
					invoice={invoice}
					primary_service={primary_service}
					importer_exporter={importer_exporter}
					setCurrentView={setCurrentView}
					currencyConversions={currencyConversions}
					getCheckoutLoading={getCheckoutLoading}
				/>
			)}
			{currentView.quotation === 'active' && (
				<RateSummary
					detail={detail}
					allServices={allServices}
					rate={rate}
					summary={summary}
					cogopoint_data={cogopoint_data}
					refetch={refetch}
					getCheckoutLoading={getCheckoutLoading}
				/>
			)}
		</>
	);
}

export default HaulageMobile;
