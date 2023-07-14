import DutiesTaxesModal from '@/ui/commons/components/DutiesTaxes';
import IEControlsModal from '@/ui/commons/components/ImportExportControls';
import IEDocumentsModal from '@/ui/commons/components/ImportExportDoc';
import TraderEligibilityModal from '@/ui/commons/components/TraderEligibility';

const SERVICES_MODAL = {
	DUTIES    : DutiesTaxesModal,
	SCREENING : TraderEligibilityModal,
	DOCUMENTS : IEDocumentsModal,
	CONTROLS  : IEControlsModal,
};

function EmptyState() {
	return <div />;
}

function CommonServicesModal({ tradeEngineResponse = {}, requestType }) {
	const Component = SERVICES_MODAL?.[requestType];

	return (
		<div>
			<Component tradeEngineResponse={tradeEngineResponse} isModal EmptyState={EmptyState} listClassName="list" />
		</div>
	);
}

export default CommonServicesModal;
