import { useState } from 'react';

import KycMessage from '../../../commons/KycMessage';
import MobileHeader from '../../../commons/MobileHeader';
import RateSummary from '../../../commons/RateSummary';
import ReviewBooking from '../../../commons/ReviewBooking';
import useFcl from '../useFcl';

import Details from './Details';
import Invoice from './Invoice';

function FclMobile(props) {
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
		shipping_line,
		transit_time,
		free_days_destination_detention,
		allServices,
		primary_service,
		cargo_value,
		cargo_value_currency,
		importer_exporter,
	} = useFcl({ detail, rate, summary });

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
					rate={rate}
					summary={summary}
					detail={detail}
					refetch={refetch}
					shipping_line={shipping_line}
					transit_time={transit_time}
					free_days_destination_detention={free_days_destination_detention}
					allServices={allServices}
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
					cargo_value={cargo_value}
					cargo_value_currency={cargo_value_currency}
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

export default FclMobile;
