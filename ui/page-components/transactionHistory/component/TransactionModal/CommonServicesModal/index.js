import IEControlsModal from '@/ui/commons/components/ImportExportControls';
import IEDocumentsModal from '@/ui/commons/components/ImportExportDoc';

const SERVICES_MODAL = {
	// DUTIES    : DutiesTaxesModal,
	// SCREENING : TraderEligibilityModal,
	DOCUMENTS : IEDocumentsModal,
	CONTROLS  : IEControlsModal,
};

function EmptyState() {
	return <div />;
}

function CommonServicesModal({ tradeEngineResponse = {}, requestType }) {
	const { modeOfTransport = '', lineItem = [] } = tradeEngineResponse;
	const { hsNumber = '', documents = [], controls = [] } = lineItem?.[0] || {};
	const Component = SERVICES_MODAL?.[requestType];

	return (
		<div>
			<Component modeOfTransport={modeOfTransport} {...lineItem?.[0]} isModal EmptyState={EmptyState} />
		</div>
	);
}

export default CommonServicesModal;
