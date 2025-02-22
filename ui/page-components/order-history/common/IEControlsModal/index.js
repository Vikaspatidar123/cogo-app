import { isEmpty } from '@cogoport/utils';

import EmptyState from '../EmptyState';

import ControlsResult from '@/ui/commons/components/ImportExportControls';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function IEControlsModal({ tradeEngineResponse = {} }) {
	const { lineItem = [] } = tradeEngineResponse || {};
	const { controls = [] } = lineItem[GLOBAL_CONSTANTS.zeroth_index] || {};

	if (isEmpty(controls)) return <EmptyState />;

	return (
		<ControlsResult
			tradeEngineResponse={tradeEngineResponse}
			EmptyState={EmptyState}
			listClassName="list"
		/>
	);
}
export default IEControlsModal;
