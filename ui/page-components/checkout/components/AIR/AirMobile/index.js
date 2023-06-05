import { useState } from 'react';

import KycMessage from '../../../commons/KycMessage';
import MobileHeader from '../../../commons/MobileHeader';
import RateSummary from '../../../commons/RateSummary';
import ReviewBooking from '../../../commons/ReviewBooking';
import useAir from '../useAir';

import Details from './Details';
import Invoice from './Invoice';

function AirMobile(props) {
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

	const [currentView, setCurrentView] = useState({
		detail    : 'active',
		invoice   : 'inactive',
		quotation : 'inactive',
	});

	const {
		air_line,
		transit_time,
		allServices,
		primary_service,
		importer_exporter,
	} = useAir({ detail, rate, summary });

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
					summary={summary}
					rate={rate}
					air_line={air_line}
					transit_time={transit_time}
					allServices={allServices}
					refetch={refetch}
					setCurrentView={setCurrentView}
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

export default AirMobile;
