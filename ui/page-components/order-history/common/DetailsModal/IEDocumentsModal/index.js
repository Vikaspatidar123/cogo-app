import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../EmptyState';

import DocumentResult from '@/ui/commons/components/ImportExportDoc';

function IEDocumentsModal({ tradeEngineResponse = {} }) {
	const { lineItem = [] } = tradeEngineResponse;
	const { documents = [] } = lineItem?.[0] || {};

	if (isEmpty(documents)) return	<EmptyState />;

	return (
		<DocumentResult
			tradeEngineResponse={tradeEngineResponse}
			EmptyState={EmptyState}
			isModal
		/>

	);
}

export default IEDocumentsModal;
