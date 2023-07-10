const SERVICES_MODAL = {
	// QUOTATION: QuotationModal,
	// DUTIES    : DutiesTaxesModal,
	// SCREENING : TraderEligibilityModal,
	// DOCUMENTS : IEDocumentsModal,
	// CONTROLS  : IEControlsModal,
};

function CommonServicesModal({ tradeEngineResponse = {}, requestType }) {
	const { modeOfTransport = '', lineItem = [] } = tradeEngineResponse;
	const { hsNumber = '', documents = [], controls = [] } = lineItem?.[0] || {};
	return (
		<div />
	);
}

export default CommonServicesModal;
