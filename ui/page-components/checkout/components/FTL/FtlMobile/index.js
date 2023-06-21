import { useState } from 'react';

import KycMessage from '../../../commons/KycMessage';
import MobileHeader from '../../../commons/MobileHeader';
import RateSummary from '../../../commons/RateSummary';
import ReviewBooking from '../../../commons/ReviewBooking';
import useFtl from '../useFtl';

import Details from './Details';
import Invoice from './Invoice';

function FltMobile({
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
		packages,
		trip_type,
		transit_time,
		transitTime,
		free_detention_hours,
		touchPointsToShow,
		allServices,
		primary_service,
		importer_exporter,
	} = useFtl({ detail, summary, rate });

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
					touchPointsToShow={touchPointsToShow}
					allServices={allServices}
					refetch={refetch}
					trip_type={trip_type}
					transit_time={transit_time}
					transitTime={transitTime}
					free_detention_hours={free_detention_hours}
					packages={packages}
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

export default FltMobile;
