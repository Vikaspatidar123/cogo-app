import { useState } from 'react';

import KycMessage from '../../../commons/KycMessage';
import MobileHeader from '../../../commons/MobileHeader';
import RateSummary from '../../../commons/RateSummary';
import ReviewBooking from '../../../commons/ReviewBooking';
import useAirCustoms from '../useAirCustoms';

import Details from './Details';
import Invoice from './Invoice';

function Quotation({
	detail,
	allServices,
	rate,
	summary,
	cogopoint_data,
	refetch,
	getCheckoutLoading,
}) {
	return (
		<RateSummary
			detail={detail}
			allServices={allServices}
			rate={rate}
			summary={summary}
			cogopoint_data={cogopoint_data}
			refetch={refetch}
			getCheckoutLoading={getCheckoutLoading}
		/>
	);
}

function AirCustomsMobile(props) {
	const {
		rate,
		summary,
		refetch,
		invoice,
		organization,
		detail,
		cogopoint_data,
		currencyConversions,
		getCheckoutLoading,
	} = props;

	const [currentView, setCurrentView] = useState({
		detail    : 'active',
		invoice   : 'inactive',
		quotation : 'inactive',
	});

	const {
		trade_type,
		shipping_line,
		primary_service,
		allServices,
		importer_exporter,
	} = useAirCustoms({ rate, summary, detail });

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
					setCurrentView={setCurrentView}
					trade_type={trade_type}
					rate={rate}
					shipping_line={shipping_line}
					primary_service={primary_service}
					allServices={allServices}
					refetch={refetch}
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
				<Quotation
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

export default AirCustomsMobile;
